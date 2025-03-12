import React, { useEffect, useRef } from "react";
import Prism from "prismjs"; // Import Prism directly
import "prismjs/themes/prism.css"; // Or your preferred theme
// import './CodeViewerGlobal.css'; // Global CSS

function CodeViewerGlobal(change) {
  useEffect(() => {
    const codeBlockContainers = document.querySelectorAll(
      ".ql-code-block-container"
    );
    codeBlockContainers.forEach((container) => {
      // Check if the container already has a code element, if not create one
      if (!container.querySelector("pre")) {
        const codeText = container.textContent; //Get Text of Div
        container.textContent = ""; //Clear Div's content

        const pre = document.createElement("pre");
        pre.classList.add("code-viewer-pre");

        const codeElement = document.createElement("code");
        codeElement.classList.add("language-javascript");
        codeElement.textContent = codeText;

        pre.appendChild(codeElement);
        container.appendChild(pre);

        Prism.highlightElement(codeElement);
      }
    });
  }, [change]); // Run only once on component mount

  return null; // This component doesn't render anything directly
}

export default CodeViewerGlobal;
