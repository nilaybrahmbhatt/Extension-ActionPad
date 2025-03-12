// import axios from "axios";
// import * as Cheerio from "cheerio";
import { useRef, useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Switch } from "./switch";

export default function AddNewCard(props) {
  const { handleaddCard, setInputText } = props;
  const quillRef = useRef();
  const [text, setText] = useState();
  const [isTask, setIsTask] = useState(false);

  const handleChange = (content, delta, source, editor) => {
    setText(content);
  };

  return (
    <div className="rounded-xl p-0 flex flex-col h-full">
      <div className="flex-1 border-border/70 border-b border-dashed">
        <ReactQuill
          ref={quillRef}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }],[
                ("bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block")
              ],
              [
                { list: "ordered" },
                { list: "bullet" },
                // { indent: "-1" },
                // { indent: "+1" },
              ],
              ["clean"],
              ["link", "image"],
            ],
            syntax: false,
            clipboard: {
              matchVisual: true,
            },
          }}
          placeholder="Start writing your notes here..."
          theme="snow"
          onChange={handleChange}
        />
      </div>
      <div className="p-5">
        <div>
          <div className="flex gap-5">
            <Switch label="is task?" checked={isTask} setChecked={setIsTask} />
            {isTask && (
              <input
                type="date"
                placeholder="Enter Date if this is task"
                className="flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              ></input>
            )}
          </div>
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
    </div>
  );
}
