import React from "react";

interface EyeLogoProps {
  innerColor?: string;
  outerColor?: string;
  pupilX?: number;
  pupilY?: number;
}

const EyeLogo: React.FC<EyeLogoProps> = ({
  innerColor = "white",
  outerColor = "black",
  pupilX = 100,
  pupilY = 100,
}) => {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: innerColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: outerColor, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#radialGradient)" />
      <path
        d={`M${pupilX} ${pupilY - 60} Q${pupilX + 10} ${pupilY - 40} ${pupilX + 10} ${pupilY} Q${pupilX + 10} ${pupilY + 40} ${pupilX} ${pupilY + 60} Q${pupilX - 10} ${pupilY + 40} ${pupilX - 10} ${pupilY} Q${pupilX - 10} ${pupilY - 40} ${pupilX} ${pupilY - 60} Z`}
        fill="black"
      />
    </svg>
  );
};

export default EyeLogo;
