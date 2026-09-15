import { COURSE_PLAN_IMAGE, HOLE_POSITIONS } from "@/lib/course-holes";

const HOLE_NUMBERS = Object.keys(HOLE_POSITIONS).map(Number);

export default function InteractiveCourseMap() {
  return (
    <figure
      data-reveal="scale"
      className="relative mx-auto aspect-square w-full max-w-[1040px] overflow-hidden"
    >
      <svg
        viewBox="0 0 100 100"
        className="block size-full"
        role="img"
        aria-labelledby="course-map-title course-map-description"
      >
        <title id="course-map-title">CamSur Uptown golf course master plan</title>
        <desc id="course-map-description">
          Golf course master plan with holes 1 through 18 and callouts for the Clubhouse and Maintenance Area.
        </desc>

        <defs>
          <filter id="map-label-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0.25" stdDeviation="0.32" floodColor="#081b12" floodOpacity="0.55" />
          </filter>
          <marker id="map-callout-arrow" markerWidth="4" markerHeight="4" refX="3.5" refY="2" orient="auto">
            <path d="M0 0 4 2 0 4Z" fill="#f4dfa0" />
          </marker>
        </defs>

        <image href={COURSE_PLAN_IMAGE} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />

        {HOLE_NUMBERS.map((number) => {
          const position = HOLE_POSITIONS[number];

          return (
            <g key={number} aria-label={`Hole ${number}`} filter="url(#map-label-shadow)">
              <circle cx={position.x} cy={position.y} r="1.08" fill="#174630" stroke="#e7d18d" strokeWidth="0.16" />
              <text
                x={position.x}
                y={position.y + 0.36}
                textAnchor="middle"
                fill="#f8e9b7"
                fontFamily="Arial, sans-serif"
                fontSize="1.05"
                fontWeight="800"
              >
                {number}
              </text>
            </g>
          );
        })}

        <g filter="url(#map-label-shadow)">
          <rect x="51" y="51.1" width="10.2" height="3" rx="0.3" fill="#14271d" stroke="#c39e40" strokeWidth="0.14" />
          <text x="56.1" y="53.05" textAnchor="middle" fill="#f8e9b7" fontFamily="Arial, sans-serif" fontSize="1.05" fontWeight="800" letterSpacing="0.06">
            CLUBHOUSE
          </text>
          <path d="M55.4 54.1 50.7 57.1" fill="none" stroke="#f4dfa0" strokeWidth="0.24" markerEnd="url(#map-callout-arrow)" />
        </g>

        <g filter="url(#map-label-shadow)">
          <rect x="10.3" y="86.1" width="15.8" height="3" rx="0.3" fill="#14271d" stroke="#c39e40" strokeWidth="0.14" />
          <text x="18.2" y="88.05" textAnchor="middle" fill="#f8e9b7" fontFamily="Arial, sans-serif" fontSize="0.98" fontWeight="800" letterSpacing="0.04">
            MAINTENANCE AREA
          </text>
          <path d="M26.1 87.6 28.6 88.5" fill="none" stroke="#f4dfa0" strokeWidth="0.24" markerEnd="url(#map-callout-arrow)" />
        </g>
      </svg>

      <figcaption className="sr-only">
        Updated golf course master plan with numbered markers for holes 1 through 18 and labels for the Clubhouse and
        Maintenance Area.
      </figcaption>
    </figure>
  );
}
