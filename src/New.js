import React, { useCallback } from "react";
import { useState } from "react";

import "reactflow/dist/style.css";
import "./App.css";
import Flow from "./Flow";

export default function App() {
  const [isText, setIsText] = useState(true);
  const [text, setText] = useState(null);
  const [textData, setTextData] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
    console.log("text", text);
  };

  const saveText = () => {
    debugger;
    setIsText(!isText);
    setTextData((prev) => {
      return [...prev, text];
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen py-8">
      <Flow />
      <div className="w-1/3">
        <form className="flex flex-col justify-center gap-4">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center px-2 pb-2 border-b text-md border-gray">
              <span className="font-light cursor-pointer text-md material-symbols-outlined opacity-60 hover:opacity-40">
                arrow_back
              </span>
              <span className="m-auto opacity-60">Message</span>
            </div>
            {isText ? (
              <div className="flex flex-col justify-center gap-4 px-4 ">
                <span className="text-xs">Text</span>
                <textarea
                  onChange={handleChange}
                  rows="6"
                  alt="message"
                  placeholder="Write your text here"
                  className="p-4 text-sm border outline-none"
                ></textarea>
                <button
                  type="button"
                  onClick={saveText}
                  className="flex flex-col items-center justify-center gap-4 p-2 m-auto text-xs text-blue-900 border border-blue-900 rounded-lg w-fit hover:opacity-60"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-4">
                {textData.map((ele) => {
                  return (
                    <div className="flex flex-col items-center justify-center w-full gap-4 p-8 text-blue-900 border border-blue-900 rounded-lg hover:opacity-60">
                      {ele}
                    </div>
                  );
                })}
                {/* <button
                  type="button"
                  onClick={saveText}
                  className="flex flex-col items-center justify-center gap-4 p-2 m-auto text-xs text-blue-900 border border-blue-900 rounded-lg w-fit hover:opacity-60"
                >
                  + Add Text
                </button> */}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
