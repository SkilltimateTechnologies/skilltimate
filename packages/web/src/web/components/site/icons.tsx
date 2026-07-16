import { STAR_PATH } from "../../lib/theme";

export function Star({
  size = "1em",
  fill = "#E7B94C",
  twinkle = true,
  className,
  style,
}: {
  size?: string | number;
  fill?: string;
  twinkle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      style={{
        width: size,
        height: size,
        fill,
        animation: twinkle ? "st_tw 2.8s ease-in-out infinite" : undefined,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
