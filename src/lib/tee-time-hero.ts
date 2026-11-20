// Each variant stays below the previous Next Image response at that width.
// Serve the finished files directly to avoid a second lossy encode.
const widths = [640, 750, 828, 1080, 1200, 1672];
const directory = "/hero-images/tee-time-clear";
const srcSet = (format: "avif" | "webp") =>
  widths.map((width) => `${directory}/${width}.${format} ${width}w`).join(", ");

export const TEE_TIME_HERO = {
  src: `${directory}/1672.webp`,
  imageClassName: "object-[60%_center] sm:object-[50%_70%]",
  bottomSurface: "#f3ede1",
  imageSources: {
    avif: srcSet("avif"),
    webp: srcSet("webp"),
    width: 1672,
    height: 941,
  },
  shadeClassName:
    "bg-[linear-gradient(180deg,rgba(7,23,15,0.52)_0%,rgba(7,23,15,0.12)_38%,rgba(7,23,15,0.76)_100%)]",
} as const;
