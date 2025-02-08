import React, { useState } from "react";
import EyeLogo from "./Eye";

const App: React.FC = () => {
  const [pupilPosition, setPupilPosition] = useState({ x: 100, y: 100 });
  const [isTextFocused, setIsTextFocused] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTextFocused) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const maxMove = 30; // Limit pupil movement
    const scale = Math.min(1, maxMove / distance);

    setPupilPosition({
      x: 100 + deltaX * scale,
      y: 100 + deltaY * scale,
    });
  };

  const handleFocus = () => {
    setIsTextFocused(true);
    setPupilPosition({ x: 100, y: 130 }); // Lock eye looking down
  };

  const handleBlur = () => {
    setIsTextFocused(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      onMouseMove={handleMouseMove}>
      <EyeLogo pupilX={pupilPosition.x} pupilY={pupilPosition.y} maxMove={30} />
      <input type="text" onFocus={handleFocus} onBlur={handleBlur} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }} placeholder="Type something..." />
    </div>
  );
};

export default App;
