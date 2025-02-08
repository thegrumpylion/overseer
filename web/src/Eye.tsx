import React from "react";

interface EyeLogoProps {
  innerColor?: string;
  outerColor?: string;
  pupilX?: number;
  pupilY?: number;
  maxMove?: number;
}

const EyeLogo: React.FC<EyeLogoProps> = ({
  innerColor = "white",
  outerColor = "black",
  pupilX = 100,
  pupilY = 100,
  maxMove = 30,
}) => {
  const eyeCenterX = 100;
  const eyeCenterY = 100;
  const maxX = Math.min(Math.max(pupilX, eyeCenterX - maxMove), eyeCenterX + maxMove);
  const maxY = Math.min(Math.max(pupilY, eyeCenterY - maxMove), eyeCenterY + maxMove);

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radialGradient" cx={`${maxX / 200 * 100}%`} cy={`${maxY / 200 * 100}%`} r="50%" fx={`${maxX / 200 * 100}%`} fy={`${maxY / 200 * 100}%`}>
          <stop offset="0%" style={{ stopColor: innerColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: outerColor, stopOpacity: 1 }} />
        </radialGradient>
        <clipPath id="eyeClip">
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#radialGradient)" />
      <path
        d={`M${maxX} ${maxY - 60} Q${maxX + 10} ${maxY - 40} ${maxX + 10} ${maxY} Q${maxX + 10} ${maxY + 40} ${maxX} ${maxY + 60} Q${maxX - 10} ${maxY + 40} ${maxX - 10} ${maxY} Q${maxX - 10} ${maxY - 40} ${maxX} ${maxY - 60} Z`}
        fill="black"
        clip-path="url(#eyeClip)"
      />
    </svg>
  );
};

export default EyeLogo;
