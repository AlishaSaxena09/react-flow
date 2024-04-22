import React, { useState } from "react";

const Sidebar = () => {
  // State for managing text input
  const [isText, setIsText] = useState(true); // State to toggle between text input mode and text display mode
  const [text, setText] = useState(null); // State to hold the text input value
  const [textData, setTextData] = useState([]); // State to store the entered text data

  // Function to handle text input change
  const handleChange = (e) => {
    setText(e.target.value); // Update the text state with the entered value
    console.log("text", text); // Log the current text value
  };

  // Function to handle drag start event for dragging text nodes
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType); // Set data to be transferred during drag
    event.dataTransfer.effectAllowed = "move"; // Set the drag effect
  };

  // Function to save entered text
  const saveText = () => {
    setIsText(!isText); // Toggle text input mode
    setTextData((prev) => {
      return [...prev, text]; // Add entered text to the text data array
    });
  };

  return (
    <aside>
      {/* Render text input mode */}
      {isText ? (
        <div className="flex flex-col justify-center gap-4 px-4 ">
          {/* Header */}
          <div className="flex items-center px-2 pb-2 border-b text-md border-gray">
            {/* Back button */}
            {text && (
              <span
                onClick={() => setIsText(!isText)}
                className="font-light cursor-pointer text-md material-symbols-outlined opacity-60 hover:opacity-40"
              >
                arrow_back
              </span>
            )}
            {/* Title */}
            <span className="m-auto opacity-60">Message</span>
          </div>
          {/* Text input */}
          <span className="text-xs">Text</span>
          <textarea
            onChange={handleChange}
            rows="6"
            alt="message"
            placeholder="Write your text here"
            className="p-4 text-sm border outline-none"
          ></textarea>
          {/* Save button */}
          <button
            type="button"
            onClick={saveText}
            className="flex flex-col items-center justify-center gap-4 p-2 m-auto text-xs text-blue-900 border border-blue-900 rounded-lg w-fit hover:opacity-60"
          >
            Save Changes
          </button>
        </div>
      ) : (
        // Render text display mode
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Render saved text data */}
          {textData.map((ele) => {
            return (
              <div
                onDragStart={(event) => onDragStart(event, ele)}
                draggable
                className="flex flex-col items-center justify-center w-full gap-4 p-8 text-blue-900 border border-blue-900 rounded-lg hover:opacity-60"
              >
                {ele}
              </div>
            );
          })}
          {/* Button to toggle back to text input mode */}
          <button
            type="button"
            onClick={() => setIsText(!isText)}
            className="flex flex-col items-center justify-center gap-4 p-2 text-xs rounded-lg w-fit hover:opacity-60"
          >
            + Add Text
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
