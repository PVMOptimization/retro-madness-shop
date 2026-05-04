type Props = {
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
};

export default function SectionDivider({
  flip = false,
  fromColor = "#0B0B0F",
  toColor = "#12121A",
}: Props) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "80px", marginTop: "-1px", background: toColor }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
      >
        <path
          d={`M0,0 L1440,0 L1440,20 Q720,80 0,20 Z`}
          fill={fromColor}
        />
      </svg>
    </div>
  );
}
