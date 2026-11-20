import type { CSSProperties } from "react";
import styles from "./SectionBlend.module.css";

/** Carries an adjacent section's surface into a photo without adding layout space. */
export default function SectionBlend({
  surface,
  edge,
  height,
}: {
  surface: string;
  edge: "top" | "bottom";
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.blend} ${styles[edge]}`}
      style={{ "--section-surface": surface, height } as CSSProperties}
    />
  );
}
