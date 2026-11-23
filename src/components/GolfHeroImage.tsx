// These finished variants are compressed to the previous hero's byte limits.
// Native picture sources avoid a second lossy encode of the detailed panorama.
const widths = [640, 750, 828, 1080, 1200, 1672];

export default function GolfHeroImage({ src, alt }: { src: string; alt: string }) {
  const directory = src.slice(0, src.lastIndexOf("/"));
  const srcSet = (format: "avif" | "webp") =>
    widths.map((width) => `${directory}/${width}.${format} ${width}w`).join(", ");

  return (
    <picture className="pointer-events-none absolute inset-0 -z-20">
      <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
      <img
        src={src}
        srcSet={srcSet("webp")}
        sizes="100vw"
        alt={alt}
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
        data-hero-media=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}
