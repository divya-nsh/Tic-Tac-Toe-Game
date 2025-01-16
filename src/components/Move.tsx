export function AnimatedCircle({
  size,
  strokeWidth = 4,
  animateSpeed = 0.5,
  strokeColor = "#2563eb",
}: {
  size: number;
  strokeColor?: string;
  strokeWidth?: number;
  animateSpeed?: number;
}) {
  return (
    <svg width={size} height={size}>
      <circle
        cx={Math.floor(size / 2)}
        cy={Math.floor(size / 2)}
        r={Math.floor(size / 2) - strokeWidth}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        className="fill-none"
        strokeDasharray="251.2"
        strokeDashoffset="251.2"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="251.2"
          to="0"
          dur={animateSpeed}
          fill="freeze"
        />
      </circle>
    </svg>
  );
}

export function AnimatedCross({
  size = 60,
  speed = 0.5,
  strokeWidth = 8,
}: {
  size?: number;
  speed?: number;
  strokeWidth?: number;
  strokeColor?: string;
}) {
  return (
    <svg width={size} height={size}>
      <line
        x1="10"
        y1="10"
        x2={size - 10}
        y2={size - 10}
        className=" stroke-red-600"
        strokeWidth={strokeWidth}
        strokeDasharray="120"
        strokeDashoffset="120"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="120"
          to="0"
          dur={speed / 2}
          fill="freeze"
        />
      </line>
      <line
        x1={size - 10}
        y1="10"
        x2="10"
        y2={size - 10}
        className="stroke-red-600"
        strokeWidth={strokeWidth}
        strokeDasharray="120"
        strokeDashoffset="120"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="120"
          to="0"
          dur={speed / 2}
          fill="freeze"
          begin={speed / 2}
        />
      </line>
    </svg>
  );
}
