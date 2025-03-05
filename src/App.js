import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { generatePdf } from "./utils/pdfGenerator";
import { useChromeStorageLocal } from "use-chrome-storage";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// import { saveAs } from "file-saver";
// import { pdfExporter } from "quill-to-pdf";

function App() {
  const [text, setText] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const quillRef = useRef(null); // Ref to access Quill editor instance
  const [editorMounted, setEditorMounted] = useState(false);
  const [value, setValue, isPersistent, error, isInitialStateResolved] =
    useChromeStorageLocal("userNotes", "");

  useEffect(() => {
    setLoading(true);
    if (isInitialStateResolved) {
      setEditorMounted(true);
      setText(value);
      setLoading(false);
    }
  }, [isInitialStateResolved]);

  const handleChange = (content, delta, source, editor) => {
    setText(content); // Update the state with the HTML content
    setValue(content);
  };

  const handleNightModeToggle = () => {
    setNightMode(!nightMode);
  };

  const handleExportPdf = async () => {
    generatePdf(text);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`App`}>
      <div className="editor-container">
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
        {/* <ReactQuill
                    ref={quillRef}
                    className="editor"
                    value={text}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Start typing here..."
                /> */}
      </div>

      <div className="controls">
        <button onClick={handleExportPdf}>Export to PDF</button>
      </div>
    </div>
  );
}

export default App;
