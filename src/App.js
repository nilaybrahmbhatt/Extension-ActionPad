import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import * as Cheerio from "cheerio";
// import { generatePdf } from "./utils/pdfGenerator";
import { useChromeStorageLocal } from "use-chrome-storage";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useTheme } from "./components/ThemeProvider";
import AddNewCard from "./components/addNewCard";
import axios from "axios";
import { HoverEffect } from "./components/card-hover-effect";
import { Input } from "./components/input";
// import Checkbox from "./components/checkbox";
// import { Switch } from "./components/switch";
import { ArrowDownUp, Moon, Sun } from "lucide-react";
// import CodeViewerGlobal from "./components/codeViewerGlobal";
import BubbleCursor from "./components/bubble-cursor";
import { extractBookmarks } from "./utils/utills";

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

const BgContainer = () => {
  return (
    <div className="absolute inset-0  -z-10 ">
      <svg class=" w-full h-full border-y border-dashed border-border stroke-border/70 ">
        <defs>
          <pattern
            id="diagonal-footer-pattern"
            patternUnits="userSpaceOnUse"
            width="64"
            height="64"
          >
            <path d="M-106 110L22 -18" stroke="" strokeWidth="1"></path>
            <path d="M-98 110L30 -18" stroke="" strokeWidth="1"></path>
            <path d="M-90 110L38 -18" stroke="" strokeWidth="1"></path>
            <path d="M-82 110L46 -18" stroke="" strokeWidth="1"></path>
            <path d="M-74 110L54 -18" stroke="" strokeWidth="1"></path>
            <path d="M-66 110L62 -18" stroke="" strokeWidth="1"></path>
            <path d="M-58 110L70 -18" stroke="" strokeWidth="1"></path>
            <path d="M-50 110L78 -18" stroke="" strokeWidth="1"></path>
            <path d="M-42 110L86 -18" stroke="" strokeWidth="1"></path>
            <path d="M-34 110L94 -18" stroke="" strokeWidth="1"></path>
            <path d="M-26 110L102 -18" stroke="" strokeWidth="1"></path>
            <path d="M-18 110L110 -18" stroke="" strokeWidth="1"></path>
            <path d="M-10 110L118 -18" stroke="" strokeWidth="1"></path>
            <path d="M-2 110L126 -18" stroke="" strokeWidth="1"></path>
            <path d="M6 110L134 -18" stroke="" strokeWidth="1"></path>
            <path d="M14 110L142 -18" stroke="" strokeWidth="1"></path>
            <path d="M22 110L150 -18" stroke="" strokeWidth="1"></path>
          </pattern>
        </defs>
        <rect
          stroke="none"
          width="100%"
          height="100%"
          fill="url(#diagonal-footer-pattern)"
        ></rect>
      </svg>
    </div>
  );
};

async function getUrlMetadata(url) {
  try {
    const response = await axios.get(url); // Adjust timeout as needed

    if (response.status >= 400) {
    } else {
      const $ = Cheerio.load(response.data); // Load the HTML into cheerio
      const title = $("title").text() || null;
      let description = $('meta[name="description"]').attr("content");
      description =
        description || $('meta[property="og:description"]').attr("content");
      description = description || null;

      let image = $('meta[property="og:image"]').attr("content");
      image = image || null;

      return {
        url: url,
        title: title,
        description: description,
        image: image,
      };
    }
  } catch (error) {
    // console.error(`Error fetching URL ${url}: ${error}`);
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
        ${
          metadata.image
            ? `<img src="${metadata.image}" class="object-cover rounded mb-2 h-36 w-full " alt="Preview">`
            : ""
        }
        <h3 class="text-sm capitalize mb-2 font-bold text-justify " >${
          metadata.title || "No Title"
        }</h3>
        <p class="text-xs text-muted-foreground text-justify" >${
          metadata.description || "No Description"
        }</p>
      </a>
    </div>
  `;
  return html;
}

const filterButtons = ["All", "Images", "Links"];

function App() {
  // const [text, setText] = useState();
  // const [nightMode, setNightMode] = useState(false);
  const [loading, setLoading] = useState(false);
  // const quillRef = useRef(null); // Ref to access Quill editor instance
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState(false);

  const [cardData, setCardData] = useState([]);
  const [allCardData, setAllCardData] = useState([]);

  // const [editorMounted, setEditorMounted] = useState(false);
  const [value, setValue, isPersistent, error, isInitialStateResolved] =
    useChromeStorageLocal("userNotes", "");
  
  useEffect(() => {
    if (isInitialStateResolved) {
      if (typeof value == "string") {
        if (value != "") {
          setCardData(JSON.parse(value));
        }
      } else {
        setCardData(value);
      }
    }
  }, [isInitialStateResolved]);

  useEffect(() => {
    const handleMessage = (request, sender, sendResponse) => {
      if (request.action === "addTextToList") {
        const newText = request.payload.text;
        setCardData((prevList) => [
          ...prevList,
          {
            date: new Date(),
            data: newText,
          },
        ]);
      }
    };

    window.chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      window.chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // useEffect(() => {
  //   window.chrome.contextMenus.onClicked.addListener(handleMessage);
  //   return () => {
  //     chrome.runtime.onMessage.removeListener(handleMessage);
  //   };
  // }, []);

  useEffect(() => {
    if (cardData.length > 0) {
      try {
        setValue(JSON.stringify(cardData));
      } catch (e) {}
    }
  }, [cardData]);

  const importBookmark = async () => {
    setLoading(true);
    window.chrome.bookmarks.getTree(async (data) => {
      const list = extractBookmarks(data);
      const updatedContent = await Promise.all(
        list.map(async (link) => {
          const metadata = await getUrlMetadata(link.url);
          if (metadata) {
            return { link: link.url, data: createCard(metadata) };
          } else {
            return {
              link: link.url,
              data: createCard({
                url: link.url,
                title: link.title,
              }),
            };
          }
        })
      );
      let allContent = [];
      updatedContent.map((item) => {
        if (item && item.data) {
          allContent.push({
            date: new Date(),
            data: item.data,
          });
        }
      });

      setCardData([...cardData, ...allContent]);
      // setAllCardData([...cardData, ...allContent]);
      setLoading(false);
    });
  };

  const handleaddCard = async (content) => {
    let allContent = content;
    let links = extractFullLinks(allContent);
    if (links && links.length > 0) {
      const updatedContent = await Promise.all(
        links.map(async (link) => {
          const metadata = await getUrlMetadata(link);
          return { link, data: createCard(metadata) };
        })
      );
      updatedContent.map((item) => {
        allContent = allContent.replace(item.link, item.data);
      });
      setCardData([...cardData, { date: new Date(), data: allContent }]);
      setAllCardData([...cardData, { date: new Date(), data: allContent }]);
    } else {
      setCardData([...cardData, { date: new Date(), data: content }]);
      setAllCardData([...cardData, { date: new Date(), data: content }]);
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

  const onFilterButtonClick = (filter) => {
    setFilter(filter);
  };

  const getCardData = (cardData) => {
    let allCardData = [...cardData];
    if (filter === "All") {
      return allCardData;
    } else if (filter === "Images") {
      allCardData = cardData.filter((item) => {
        return item.data.includes("<img");
      });
    } else if (filter === "Links") {
      allCardData = cardData.filter((item) => {
        return item.data.includes("<a ");
      });
    }

    return allCardData;
  };

  const sortedCardData = (allCardData) => {
    if (sort) {
      return [...allCardData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    console.log(allCardData);

    return allCardData;
  };

  const sortData = () => {
    setSort(!sort);
  };

  return (
    <div className={`relative flex min-h-svh flex-col`}>
      <BgContainer />
      <div className="border-grid flex flex-1 flex-col">
        <header className="border-grid sticky top-0 z-50 w-full border-b ">
          <div className="container-wrapper bg-background ">
            <div className="container flex h-14 items-center gap-2 md:gap-4">
              <div className="mr-4 hidden md:flex">
                {theme === "dark" ? (
                  <img className="h-8" src="logo-dark.png" />
                ) : (
                  <img className="h-8" src="logo-light.png" />
                )}
              </div>
              <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                <div className="">
                  <div className="flex items-center">
                    <Input
                      placeholder="Type to search all your saved actions"
                      type="search"
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredData = allCardData.filter((item) => {
                          return item.data.includes(value);
                        });
                        setCardData(filteredData);
                      }}
                    />

                    {filterButtons.map((button, index) => {
                      return (
                        <button
                          key={index}
                          className={`flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary ${
                            filter === button ? "bg-muted text-primary" : ""
                          }`}
                          data-active={filter === button ? "true" : "false"}
                          onClick={() => onFilterButtonClick(button)}
                        >
                          {button}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="border-l border-border/70 pl-5 border-dashed">
                  <button
                    onClick={sortData}
                    className={
                      "hover:bg-slate-700/50 p-3 rounded " +
                      (sort ? "bg-slate-700/50" : "")
                    }
                  >
                    {theme === "dark" ? (
                      <ArrowDownUp size={16} strokeWidth={1.5} color="#fff" />
                    ) : (
                      <ArrowDownUp size={16} strokeWidth={1.5} color="#000" />
                    )}
                  </button>
                </div>
                <div>
                  <button
                    onClick={toggleTheme}
                    className="hover:bg-slate-700/50 p-3 rounded "
                  >
                    {theme === "dark" ? (
                      <Sun size={16} strokeWidth={1.5} color="#fff" />
                    ) : (
                      <Moon size={16} strokeWidth={1.5} color="#000" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col h-full">
          <section className="border-grid flex-1 flex border-b">
            <div className="container-wrapper bg-background ">
              <div className="grid grid-cols-4 h-full ">
                <div className="border-border/70  border-dashed bg-card border ">
                  <AddNewCard handleaddCard={handleaddCard} />
                </div>
                <div className=" col-span-3 overflow-auto max-h-[83svh]  ">
                  {getCardData(cardData) && getCardData(cardData).length > 0 ? (
                    <HoverEffect
                      items={sortedCardData(getCardData(cardData))}
                      onDeleteCard={(newItems) => {
                        setCardData(newItems);
                        setAllCardData(newItems);
                      }}
                    />
                  ) : (
                    <div className="min-h-[75svh] flex items-center justify-center ">
                      <div className="text-center">
                        <div className="font-extrabold text-xl mb-3 ">
                          There are no cards added
                        </div>
                        <div>
                          <button
                            onClick={importBookmark}
                            disabled={loading}
                            className={
                              "rounded-full border-2 border-brand-500 px-5 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10 " +
                              (loading ? "opacity-50 cursor-not-allowed" : "")
                            }
                          >
                            {!loading ? "Import Bookmarks" : "Loading..."}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-grid border-t py-6 md:py-0">
          <div className="container-wrapper bg-background ">
            <div className="container py-4">
              <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by{" "}
                <a
                  href="https://nilaybrahmbhatt.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Nilay Brahmbhatt
                </a>
                . The source code is available o{" "}
                <a
                  href="https://github.com/nilaybrahmbhatt"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </div>
            </div>
          </div>
        </footer>
      </div>
      <BubbleCursor></BubbleCursor>
    </div>
  );

  // return (
  //   <div
  //     className={`dark:bg-black min-h-screen  ${
  //       theme === "dark" ? "dark-mode" : ""
  //     }`}
  //   >
  //     <div className="w-full border-b border-[#27272a] border-dashed px-5 py-2 ">
  //       <h5 className="text-lg dark:text-white font-extrabold font-roboto">
  //         ActionPad
  //       </h5>
  //     </div>
  //     <div className="border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10">
  //       sdsd
  //     </div>
  //     {/* <div className="card-container">
  //       <div className="card p-0">
  //         <h5>Your Notes</h5>
  //         <ReactQuill
  //           ref={quillRef}
  //           modules={{
  //             toolbar: [
  //               [{ header: [1, 2, false] }],
  //               ["bold", "italic", "underline", "strike", "blockquote"],
  //               [
  //                 { list: "ordered" },
  //                 { list: "bullet" },
  //                 { indent: "-1" },
  //                 { indent: "+1" },
  //               ],
  //               ["link", "image"],
  //             ],
  //             syntax: false,
  //             clipboard: {
  //               matchVisual: true,
  //             },
  //           }}
  //           className="editor"
  //           theme="snow"
  //           defaultValue={text}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div className="card">
  //         <h2>Card 2</h2>
  //         <p>
  //           This is the content of card 2. It fills the entire height of the
  //           card. You can put more content here.
  //         </p>
  //       </div>
  //       <div className="card">
  //         <h2>Card 3</h2>
  //         <p>
  //           This is the content of card 3. It fills the entire height of the
  //           card.
  //         </p>
  //       </div>
  //     </div> */}
  //   </div>
  // );
}

export default App;
