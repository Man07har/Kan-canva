import React from "react";
import Stage from "./components/Stage.jsx";
import Block from "./components/Blocks.jsx";
function App() {
  return (
    <>
      <div className="flex  w-full h-screen p-5 bg-gray-100">
        <Stage title="Stage 1">
          <Block />
          <Block />
        </Stage>
        <Stage title="Stage 2">
          <Block />
          <Block />
        </Stage>
        <Stage title="Stage 3">
          <Block />
          <Block />
        </Stage>
        <Stage title="Stage 4">
          <Block />
          <Block />
        </Stage>
      </div>
    </>
  );
}

export default App;
