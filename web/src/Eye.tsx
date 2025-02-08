import React, { useImperativeHandle } from "react";

interface EyeLogoProps {
  innerColor?: string;
  outerColor?: string;
  maxMoveX?: number;
  maxMoveY?: number;
  depth?: number;
  ref?: React.Ref<EyeRef>;
}

export interface EyeRef {
  lookAt: (x: number, y: number) => void;
  reset(): void;
}

const Eye: React.FC<EyeLogoProps> = ({
  innerColor = "white",
  outerColor = "black",
  maxMoveX = 30,
  maxMoveY = 30,
  depth = 10,
  ref,
}) => {
  const eyeCenterX = 100;
  const eyeCenterY = 100;

  const [maxX, setMaxX] = React.useState(100);
  const [maxY, setMaxY] = React.useState(100);

  const svgRef = React.useRef<SVGSVGElement>(null);

  useImperativeHandle(ref, () => ({
    lookAt: (x: number, y: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (x - centerX) / depth;
      const deltaY = (y - centerY) / depth;
      // cap to maxMoveX and maxMoveY
      setMaxX(eyeCenterX + Math.min(Math.max(deltaX, -maxMoveX), maxMoveX));
      setMaxY(eyeCenterY + Math.min(Math.max(deltaY, -maxMoveY), maxMoveY));
    },
    reset: () => {
      setMaxX(eyeCenterX);
      setMaxY(eyeCenterY);
    },
  }), [maxMoveX, maxMoveY]);

  return (
    <svg ref={svgRef} width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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
        clipPath="url(#eyeClip)"
      />
    </svg>
  );
};

export default Eye;
