// import axios from "axios";
// import * as Cheerio from "cheerio";
import { useRef, useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";

export default function AddNewCard(props) {
  const { handleaddCard } = props;
  const quillRef = useRef();
  const [text, setText] = useState();
  const handleChange = (content, delta, source, editor) => {
    setText(content);
  };
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

  return (
    <div className="bg-card  rounded-xl p-0  ">
      <ReactQuill
        ref={quillRef}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
            ],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            // ["link", "image"],
          ],
          syntax: false,
          clipboard: {
            matchVisual: true,
          },
        }}
        placeholder="Start writing your notes here..."
        theme="bubble"
        value={text}
        onChange={handleChange}
      />
      <div className="p-5">
        <input
          type="date"
          placeholder="Enter Date if this is task"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        ></input>
        <button
          onClick={() => {
            handleaddCard(text);
            setText("");
          }}
          className=" mt-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
