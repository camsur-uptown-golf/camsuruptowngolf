import Image from "next/image";

export default function InteractiveCourseMap() {
  return (
    <figure
      data-reveal="scale"
      className="relative mx-auto aspect-[1586/992] w-full max-w-[1180px] overflow-hidden bg-transparent"
    >
      <Image
        src="/golf/course-masterplan-illustrated-map-v4.png"
        alt="Illustrated master plan of the CamSur Uptown 18-hole golf course"
        fill
        priority
        sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1279px) calc(100vw - 5rem), 1180px"
        className="object-contain"
      />
    </figure>
  );
}
