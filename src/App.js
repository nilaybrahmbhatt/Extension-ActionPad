import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import * as Cheerio from "cheerio";

import { generatePdf } from "./utils/pdfGenerator";
import { useChromeStorageLocal } from "use-chrome-storage";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useTheme } from "./components/ThemeProvider";
import AddNewCard from "./components/addNewCard";
import axios from "axios";
import { HoverEffect } from "./components/card-hover-effect";

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

// export function CardHoverEffectDemo() {
//   return (
//     <div className="max-w-5xl mx-auto px-8">
//       <HoverEffect items={projects} />
//     </div>
//   );
// }

async function getUrlMetadata(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 }); // Adjust timeout as needed

    if (response.status >= 400) {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw error for bad responses
    }

    const $ = Cheerio.load(response.data); // Load the HTML into cheerio
    const title = $("title").text() || null;
    let description = $('meta[name="description"]').attr("content");
    description =
      description || $('meta[property="og:description"]').attr("content");
    description = description || null;

    let image = $('meta[property="og:image"]').attr("content");
    image = image || null;
    console.log({
      url: url,
      title: title,
      description: description,
      image: image,
    });

    return {
      url: url,
      title: title,
      description: description,
      image: image,
    };
  } catch (error) {
    console.error(`Error fetching URL ${url}: ${error}`);
    return null;
  }
}
function createCard(metadata) {
  if (!metadata) {
    return "<!-- Card Creation Failed (No Metadata) -->";
  }

  const html = `
    <div class="card">
      <a href="${metadata.url}" target="_blank" rel="noopener noreferrer">
        ${metadata.image ? `<img src="${metadata.image}" alt="Preview">` : ""}
        <h3>${metadata.title || "No Title"}</h3>
        <p>${metadata.description || "No Description"}</p>
      </a>
    </div>
  `;
  return html;
}

function App() {
  const [text, setText] = useState();
  const [nightMode, setNightMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const quillRef = useRef(null); // Ref to access Quill editor instance
  const [editorMounted, setEditorMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [cardData, setCardData] = useState([]);
  // const [value, setValue, isPersistent, error, isInitialStateResolved] =
  //   useChromeStorageLocal("userNotes", "");

  // useEffect(() => {
  //   setLoading(true);
  //   if (isInitialStateResolved) {
  //     setEditorMounted(true);
  //     setText(value);
  //     setLoading(false);
  //   }
  // }, [isInitialStateResolved]);

  const handleaddCard = async (content) => {
    let allContent = content;
    let links = extractFullLinks(allContent);
    if (links && links.length > 0) {
      const updatedContent = await Promise.all(
        links.map(async (link) => {
          const metadata = await getUrlMetadata(link);
          console.log("🚀 ~ handleChange ~ metadata:", createCard(metadata));
          return { link, data: createCard(metadata) };
        })
      );
      updatedContent.map((item) => {
        allContent = allContent.replace(item.link, item.data);
      });
      console.log(allContent);
      setCardData([...cardData, { date: new Date(), data: allContent }]);
    } else {
      setCardData([...cardData, { date: new Date(), data: content }]);
    }
  };
  function extractFullLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let links = [];

    const paragraphs = text.split("</p>");

    for (const paragraph of paragraphs) {
      const paragraphLinks = paragraph.match(urlRegex);
      if (paragraphLinks) {
        links = links.concat(paragraphLinks);
      }
    }

    return links ? links : [];
  }

  const handleNightModeToggle = () => {
    setNightMode(!nightMode);
  };

  const handleExportPdf = async () => {
    generatePdf(text);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  console.log("card data >>>>>>>>>>>>>>>>>>>>> ", cardData);

  return (
    <div className={`relative flex min-h-svh flex-col`}>
      <div className="border-grid flex flex-1 flex-col">
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container-wrapper">
            <div className="container flex h-14 items-center gap-2 md:gap-4">
              <div className="mr-4 hidden md:flex">
                <h5 className="font-bold  uppercase text-blue-500 ">
                  ActionPad
                </h5>
              </div>
              <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                <div className="">
                  <div className="flex items-center">
                    <a
                      className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                      data-active="true"
                      href="/"
                    >
                      All
                    </a>
                    <a
                      className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                      data-active="false"
                      href="/examples/mail"
                    >
                      Images
                    </a>
                    <a
                      className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                      data-active="false"
                      href="/examples/mail"
                    >
                      Links
                    </a>
                    <a
                      className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                      data-active="false"
                      href="/examples/mail"
                    >
                      Tasks
                    </a>
                  </div>
                </div>
                {/* <nav className="flex items-center gap-0.5">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 px-0"
                    href="https://github.com/shadcn-ui/ui"
                  >
                    <span className="sr-only">GitHub</span>
                  </a>
                </nav> */}
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col">
          <section className="border-grid border-b">
            <div className="container-wrapper">
              <div className="grid grid-cols-4 gap-5 p-5 ">
                <div>
                  <AddNewCard handleaddCard={handleaddCard} />
                </div>
                <div className=" col-span-3">
                  {
                    cardData && cardData.length > 0 && (
                      <HoverEffect items={cardData} />
                    )
                  }
                  {/* {cardData &&
                    cardData.map((card, index) => {
                      return (
                        <div
                          key={index}
                          className=" border-border border rounded-xl p-5 mb-5 "
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: card.data,
                            }}
                          ></div>
                        </div>
                      );
                    })} */}
                </div>
              </div>

              {/* <div className=" flex flex-row   ">
                <div className="flex-1">
                  <div className="border-r border-border/70 border-dashed ">
                    
                  </div>
                </div>
                <div className="flex-1">card 2</div>
                <div className="flex-1">card 3</div>
              </div> */}
            </div>
          </section>
          {/* <div className="border-grid border-b">
            <div className="container-wrapper">
              <div className="container py-4">
                <div className="relative">
                  <div
                    dir="ltr"
                    className="relative overflow-hidden max-w-[600px] lg:max-w-none"
                  >
                    <div
                      data-radix-scroll-area-viewport=""
                      className="h-full w-full rounded-[inherit]"
                    >
                      <div>
                        <div className="flex items-center [&amp;>a:first-child]:text-primary">
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="true"
                            href="/"
                          >
                            Examples
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/mail"
                          >
                            Mail
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/dashboard"
                          >
                            Dashboard
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/tasks"
                          >
                            Tasks
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/playground"
                          >
                            Playground
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/forms"
                          >
                            Forms
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/music"
                          >
                            Music
                          </a>
                          <a
                            className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
                            data-active="false"
                            href="/examples/authentication"
                          >
                            Authentication
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </main>

        <footer class="border-grid border-t py-6 md:py-0">
          <div class="container-wrapper">
            <div class="container py-4">
              <div class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built b{" "}
                <a
                  href="https://twitter.com/shadcn"
                  target="_blank"
                  rel="noreferrer"
                  class="font-medium underline underline-offset-4"
                >
                  shadcn
                </a>
                . The source code is available o{" "}
                <a
                  href="https://github.com/shadcn-ui/ui"
                  target="_blank"
                  rel="noreferrer"
                  class="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );

  return (
    <div
      className={`dark:bg-black min-h-screen  ${
        theme === "dark" ? "dark-mode" : ""
      }`}
    >
      <div className="w-full border-b border-[#27272a] border-dashed px-5 py-2 ">
        <h5 className="text-lg dark:text-white font-extrabold font-roboto">
          ActionPad
        </h5>
      </div>
      <div className="border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10">
        sdsd
      </div>
      {/* <div className="card-container">
        <div className="card p-0">
          <h5>Your Notes</h5>
          <ReactQuill
            ref={quillRef}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
              ],
              syntax: false,
              clipboard: {
                matchVisual: true,
              },
            }}
            className="editor"
            theme="snow"
            defaultValue={text}
            onChange={handleChange}
          />
        </div>
        <div className="card">
          <h2>Card 2</h2>
          <p>
            This is the content of card 2. It fills the entire height of the
            card. You can put more content here.
          </p>
        </div>
        <div className="card">
          <h2>Card 3</h2>
          <p>
            This is the content of card 3. It fills the entire height of the
            card.
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
