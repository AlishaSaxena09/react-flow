import React, { useCallback } from "react";
import { useState } from "react";

import "reactflow/dist/style.css";
import "./App.css";
import Flow from "./Flow";

export default function App() {
  const [isText, setIsText] = useState(false);

  const handleText = () => {
    setIsText(!isText);
  };
  return (
    <div className="flex justify-center w-screen h-screen py-8">
      <Flow />
      <div className="w-1/3">
        <form className="flex flex-col justify-center gap-4">
          {isText ? (
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center px-2 pb-2 border-b text-md border-gray">
                <span
                  onClick={handleText}
                  class="cursor-pointer text-md material-symbols-outlined font-light opacity-60 hover:opacity-40"
                >
                  arrow_back
                </span>
                <span className="m-auto opacity-60">Message</span>
              </div>
              <div className="flex flex-col justify-center gap-4 px-4">
                <span className="text-xs">Text</span>
                <textarea
                  rows="6"
                  alt="message"
                  placeholder="Write your text here"
                  className="p-4 text-sm border"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <button
                onClick={handleText}
                className="flex flex-col items-center justify-center w-full gap-4 p-8 text-blue-900 border border-blue-900 rounded-lg hover:opacity-60"
              >
                <span class="material-symbols-outlined text-blue-900">
                  chat
                </span>
                Message
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
