import React, { useState, useRef } from "react";
import Eye, { EyeRef } from "./Eye";

const App: React.FC = () => {
  const [isTextFocused, setIsTextFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const eyeRef = useRef<EyeRef>(null);

  const [eyeInnerColor, setEyeInnerColor] = useState("white");

  const handleMouseLeave = () => {
    setEyeInnerColor("grey")
    if (!eyeRef.current) return;
    eyeRef.current.reset();
  };

  const handleMouseEnter = () => {
    setEyeInnerColor("white")
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTextFocused) return;
    if (!eyeRef.current) return;

    eyeRef.current.lookAt(event.clientX, event.clientY);
  };

  const handleFocus = () => {
    setIsTextFocused(true);
    updatePupilToCursor();
  };

  const handleBlur = () => {
    setIsTextFocused(false);
  };

  const updatePupilToCursor = () => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const rect = input.getBoundingClientRect();
    const fontSize = 16; // Approximate character width
    const charWidth = fontSize * 0.6; // Estimate average char width

    const cursorIndex = input.selectionStart || 0;
    const cursorX = rect.left + cursorIndex * charWidth + 5;
    const cursorY = rect.top + rect.height / 2;

    eyeRef.current?.lookAt(cursorX, cursorY);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}>
      <Eye ref={eyeRef} maxMoveX={45} maxMoveY={30} depth={7} innerColor={eyeInnerColor} />
      <input
        ref={inputRef}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={updatePupilToCursor}
        onMouseUp={updatePupilToCursor}
        style={{ marginTop: "20px", padding: "10px", fontSize: "16px", width: "400px", fontFamily: "monospace" }}
        placeholder="Type something..."
      />
    </div>
  );
};

export default App;
