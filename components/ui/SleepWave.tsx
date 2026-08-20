interface SleepWaveProps {
  cycles: number;
  color?: "ember" | "moon";
  amplitude?: number;
  periodWidth?: number;
  strokeWidth?: number;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  ember: "#E8B98A",
  moon: "#8B95B2",
};

export default function SleepWave({
  cycles,
  color = "moon",
  amplitude = 5,
  periodWidth = 14,
  strokeWidth = 2,
  className = "",
}: SleepWaveProps) {
  const points = Math.max(cycles, 1);
  const width = points * periodWidth;
  const height = amplitude * 2 + strokeWidth * 2;
  const midY = height / 2;

  let d = `M 0 ${midY}`;
  for (let i = 0; i < points; i++) {
    const cx = i * periodWidth + periodWidth / 2;
    const endX = (i + 1) * periodWidth;
    d += ` Q ${cx} ${midY - amplitude} ${endX} ${midY}`;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke={COLOR_MAP[color] ?? color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
