import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = "C:/Users/User/Downloads/map (1).png";
const outputDirectory = "public/golf/map-hole-crops-v1";
const sourceSize = 2880;
const outputWidth = 1200;
const outputHeight = 1800;

/* Tee and green positions are percentages of the supplied square masterplan.
   Every export is rotated so play runs from the tee at the bottom to the
   green at the top. The crops are intentionally non-destructive: they live in
   a new versioned directory and do not replace the current aerial artwork. */
const routes = {
  1: { tee: [47, 72], green: [22, 78] },
  2: { tee: [22, 83], green: [68, 94] },
  3: { tee: [73, 91], green: [79, 65] },
  4: { tee: [91, 68], green: [90, 53] },
  5: { tee: [66, 82], green: [81, 61] },
  6: { tee: [68, 88], green: [65, 78] },
  7: { tee: [68, 70], green: [81, 50] },
  8: { tee: [57, 66], green: [66, 52] },
  9: { tee: [49, 82], green: [54, 67] },
  10: { tee: [41, 60], green: [49, 28] },
  11: { tee: [49, 21], green: [89, 9] },
  12: { tee: [88, 21], green: [56, 25] },
  13: { tee: [39, 24], green: [29, 26] },
  14: { tee: [10, 40], green: [39, 30] },
  15: { tee: [34, 61], green: [38, 57] },
  16: { tee: [35, 58], green: [15, 25] },
  17: { tee: [10, 40], green: [23, 68] },
  18: { tee: [47, 62], green: [22, 68] },
};

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const toPixel = (value) => (value / 100) * sourceSize;

await fs.mkdir(outputDirectory, { recursive: true });

for (const [holeText, route] of Object.entries(routes)) {
  const hole = Number(holeText);
  const tee = route.tee.map(toPixel);
  const green = route.green.map(toPixel);
  const dx = green[0] - tee[0];
  const dy = green[1] - tee[1];
  const distance = Math.hypot(dx, dy);
  const routeAngle = Math.atan2(dy, dx);
  const rotationRadians = -Math.PI / 2 - routeAngle;
  const rotationDegrees = (rotationRadians * 180) / Math.PI;
  const cosine = Math.cos(rotationRadians);
  const sine = Math.sin(rotationRadians);
  const rotatedWidth = Math.ceil(sourceSize * Math.abs(cosine) + sourceSize * Math.abs(sine));
  const rotatedHeight = Math.ceil(sourceSize * Math.abs(sine) + sourceSize * Math.abs(cosine));
  const midpointX = (tee[0] + green[0]) / 2;
  const midpointY = (tee[1] + green[1]) / 2;
  const centeredX = midpointX - sourceSize / 2;
  const centeredY = midpointY - sourceSize / 2;
  const rotatedMidpointX = cosine * centeredX - sine * centeredY + rotatedWidth / 2;
  const rotatedMidpointY = sine * centeredX + cosine * centeredY + rotatedHeight / 2;
  const cropHeight = Math.round(clamp(distance * 1.35 + 320, 720, 1960));
  const cropWidth = Math.round((cropHeight * 2) / 3);
  const left = Math.round(clamp(rotatedMidpointX - cropWidth / 2, 0, rotatedWidth - cropWidth));
  const top = Math.round(clamp(rotatedMidpointY - cropHeight / 2, 0, rotatedHeight - cropHeight));
  const filename = `hole-${String(hole).padStart(2, "0")}-map.png`;

  await sharp(input)
    .rotate(rotationDegrees, { background: "#f7f5ee" })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize(outputWidth, outputHeight, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, filename));
}

const thumbWidth = 240;
const thumbHeight = 360;
const columns = 6;
const rows = 3;
const contactWidth = thumbWidth * columns;
const contactHeight = thumbHeight * rows;
const composites = [];

for (let hole = 1; hole <= 18; hole += 1) {
  const left = ((hole - 1) % columns) * thumbWidth;
  const top = Math.floor((hole - 1) / columns) * thumbHeight;
  const filename = path.join(outputDirectory, `hole-${String(hole).padStart(2, "0")}-map.png`);
  const thumbnail = await sharp(filename).resize(thumbWidth, thumbHeight).toBuffer();
  const label = Buffer.from(`<svg width="${thumbWidth}" height="${thumbHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="76" height="34" rx="17" fill="#14271d"/><text x="50" y="35" text-anchor="middle" font-family="Arial" font-size="16" font-weight="800" fill="#f4dfa0">HOLE ${hole}</text></svg>`);
  composites.push({ input: thumbnail, left, top });
  composites.push({ input: label, left, top });
}

await sharp({
  create: {
    width: contactWidth,
    height: contactHeight,
    channels: 3,
    background: "#f7f5ee",
  },
})
  .composite(composites)
  .jpeg({ quality: 92 })
  .toFile(path.join(outputDirectory, "contact-sheet.jpg"));

console.log(`Created 18 portrait crops and contact sheet in ${outputDirectory}`);
