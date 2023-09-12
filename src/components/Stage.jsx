import React from "react";
import Block from "./Blocks.jsx";
function Stage({ title, children }) {
  return (
    <div className="p-5 mr-4 w-[25vw] bg-gray-200">
      <h1 className="pb-3">{title}</h1>
      {/* <Block /> */}
      {children}
    </div>
  );
}

export default Stage;
