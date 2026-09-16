import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = "public/golf/course-map-master-source-v1.png";
const outputDirectory = "public/golf/map-hole-crops-clean-v2";
const highlightedOutputDirectory = "public/golf/map-hole-crops-highlight-v3";
const sourceSize = 2880;

const routes = {
  1: { tee: [48.4, 78.94], green: [22.36, 77.69] },
  2: { tee: [33.68, 81.96], green: [67.71, 93.21] },
  3: { tee: [71.74, 87.9], green: [80.56, 66.34] },
  4: { tee: [87.78, 62.83], green: [88.58, 50.75] },
  5: { tee: [81.6, 56.02], green: [69.72, 74.57] },
  6: { tee: [68.13, 80.57], green: [67.01, 87.31] },
  7: { tee: [68.09, 56.06], green: [82.22, 50.5] },
  8: { tee: [61.94, 77.52], green: [63.7, 57.16] },
  9: { tee: [48.75, 69.84], green: [57.43, 82.8] },
  10: { tee: [40.94, 52.38], green: [48.44, 28.94] },
  11: { tee: [55.94, 18.98], green: [88.96, 9.25] },
  12: { tee: [86.11, 21.13], green: [57.05, 25.02] },
  13: { tee: [37.71, 24.39], green: [28.78, 26.41] },
  14: { tee: [16.84, 27.31], green: [39.58, 30.12] },
  15: { tee: [34.65, 46.34], green: [43.13, 59.77] },
  16: { tee: [32.36, 52.41], green: [12.99, 22.45] },
  17: { tee: [10.17, 39.53], green: [22.81, 67.86] },
  18: { tee: [25.9, 71.02], green: [47.57, 63.63] },
};

const blueMarkers = [
  [88.78, 19.36], [51.46, 20.71], [39.51, 24.5], [15.38, 25.95], [7.95, 35.92], [34.48, 44.6],
  [71.7, 52.59], [84.96, 52.83], [41.7, 55.12], [32.43, 57.14], [86.6, 63.98], [51.18, 67.03],
  [22.08, 72.97], [67.92, 79.53], [49.23, 80.36], [61.73, 81.79], [29.27, 82.14], [71.91, 90.64],
];

const yellowMarkers = [
  [92.92, 13.98], [45.45, 23.21], [14.34, 23.66], [42.09, 25.47], [6.29, 32.48], [34.44, 40.36],
  [74.31, 50.68], [87.95, 51.23], [43.02, 58.94], [33.54, 62.8], [53.61, 64.29], [84.76, 65.89],
  [19.58, 73.56], [66.94, 77.8], [51.91, 82.55], [23.82, 82.62], [62.4, 86.16], [71.91, 94.91],
];

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const toPixel = ([x, y]) => [Math.round((x / 100) * sourceSize), Math.round((y / 100) * sourceSize)];
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function assignMarkers(markerList) {
  const tees = Object.entries(routes).map(([hole, route]) => ({ hole: Number(hole), point: route.tee }));
  const candidates = [];

  for (let teeIndex = 0; teeIndex < tees.length; teeIndex += 1) {
    for (let markerIndex = 0; markerIndex < markerList.length; markerIndex += 1) {
      candidates.push({ teeIndex, markerIndex, distance: distance(tees[teeIndex].point, markerList[markerIndex]) });
    }
  }

  candidates.sort((a, b) => a.distance - b.distance);
  const usedTees = new Set();
  const usedMarkers = new Set();
  const result = {};

  for (const candidate of candidates) {
    if (usedTees.has(candidate.teeIndex) || usedMarkers.has(candidate.markerIndex)) continue;
    usedTees.add(candidate.teeIndex);
    usedMarkers.add(candidate.markerIndex);
    result[tees[candidate.teeIndex].hole] = markerList[candidate.markerIndex];
  }

  return result;
}

const blueByHole = assignMarkers(blueMarkers);
const yellowByHole = assignMarkers(yellowMarkers);
const allColoredMarkers = [
  ...Object.entries(routes).map(([hole, route]) => ({ hole: Number(hole), point: route.tee })),
  ...Object.entries(blueByHole).map(([hole, point]) => ({ hole: Number(hole), point })),
  ...Object.entries(yellowByHole).map(([hole, point]) => ({ hole: Number(hole), point })),
];

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
}

function removeInactiveMarkers(source, width, height, activeHole) {
  const output = Buffer.from(source);

  for (const marker of allColoredMarkers) {
    if (marker.hole === activeHole) continue;
    const [centerX, centerY] = toPixel(marker.point);
    const ring = [];

    for (let y = centerY - 18; y <= centerY + 18; y += 1) {
      for (let x = centerX - 18; x <= centerX + 18; x += 1) {
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        const radius = Math.hypot(x - centerX, y - centerY);
        if (radius < 11 || radius > 17) continue;
        const offset = (y * width + x) * 4;
        const r = source[offset];
        const g = source[offset + 1];
        const b = source[offset + 2];
        if (Math.max(r, g, b) - Math.min(r, g, b) > 95 || r + g + b < 105) continue;
        ring.push([r, g, b]);
      }
    }

    const fill = ring.length
      ? [median(ring.map((pixel) => pixel[0])), median(ring.map((pixel) => pixel[1])), median(ring.map((pixel) => pixel[2]))]
      : [78, 111, 54];

    for (let y = centerY - 10; y <= centerY + 10; y += 1) {
      for (let x = centerX - 10; x <= centerX + 10; x += 1) {
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        const radius = Math.hypot(x - centerX, y - centerY);
        if (radius > 9.5) continue;
        const offset = (y * width + x) * 4;
        const alpha = radius <= 7 ? 1 : 1 - (radius - 7) / 2.5;
        output[offset] = Math.round(source[offset] * (1 - alpha) + fill[0] * alpha);
        output[offset + 1] = Math.round(source[offset + 1] * (1 - alpha) + fill[1] * alpha);
        output[offset + 2] = Math.round(source[offset + 2] * (1 - alpha) + fill[2] * alpha);
      }
    }
  }

  return output;
}

function cropForRoute(route, orientation) {
  const tee = toPixel(route.tee);
  const green = toPixel(route.green);
  const dx = green[0] - tee[0];
  const dy = green[1] - tee[1];
  const routeLength = Math.hypot(dx, dy);
  const unitX = dx / routeLength;
  const unitY = dy / routeLength;
  const perpX = -unitY;
  const perpY = unitX;
  const start = [tee[0] - unitX * routeLength * 0.32, tee[1] - unitY * routeLength * 0.32];
  const end = [green[0] + unitX * routeLength * 0.14, green[1] + unitY * routeLength * 0.14];
  const halfWidth = Math.max(routeLength * 0.13, sourceSize * 0.035);
  const points = [
    [start[0] + perpX * halfWidth, start[1] + perpY * halfWidth],
    [start[0] - perpX * halfWidth, start[1] - perpY * halfWidth],
    [end[0] + perpX * halfWidth, end[1] + perpY * halfWidth],
    [end[0] - perpX * halfWidth, end[1] - perpY * halfWidth],
  ];
  let left = Math.min(...points.map((point) => point[0]));
  let right = Math.max(...points.map((point) => point[0]));
  let top = Math.min(...points.map((point) => point[1]));
  let bottom = Math.max(...points.map((point) => point[1]));
  const targetRatio = orientation === "landscape"
    ? 8 / 3
    : orientation === "rotated-landscape"
      ? 3 / 8
      : 2 / 3;
  let width = right - left;
  let height = bottom - top;

  if (width / height < targetRatio) {
    const expandedWidth = height * targetRatio;
    left -= (expandedWidth - width) / 2;
    right += (expandedWidth - width) / 2;
    width = expandedWidth;
  } else {
    const expandedHeight = width / targetRatio;
    top -= (expandedHeight - height) / 2;
    bottom += (expandedHeight - height) / 2;
    height = expandedHeight;
  }

  if (left < 0) { right -= left; left = 0; }
  if (right > sourceSize) { left -= right - sourceSize; right = sourceSize; }
  if (top < 0) { bottom -= top; top = 0; }
  if (bottom > sourceSize) { top -= bottom - sourceSize; bottom = sourceSize; }

  return {
    left: Math.round(clamp(left, 0, sourceSize - width)),
    top: Math.round(clamp(top, 0, sourceSize - height)),
    width: Math.round(width),
    height: Math.round(height),
  };
}

await fs.mkdir(outputDirectory, { recursive: true });
await fs.mkdir(highlightedOutputDirectory, { recursive: true });
const { data: source, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const manifest = {};
const highlightedManifest = {};

for (const [holeText, route] of Object.entries(routes)) {
  const hole = Number(holeText);
  const dx = route.green[0] - route.tee[0];
  const dy = route.green[1] - route.tee[1];
  const naturalOrientation = Math.abs(dx) >= Math.abs(dy) * 1.15 ? "landscape" : "portrait";
  const rotateToLandscape = hole === 3 || hole === 4;
  const processingOrientation = rotateToLandscape ? "rotated-landscape" : naturalOrientation;
  const finalOrientation = processingOrientation === "portrait" ? "portrait" : "landscape";
  const crop = cropForRoute(route, processingOrientation);
  const cleaned = removeInactiveMarkers(source, info.width, info.height, hole);
  const outputWidth = processingOrientation === "landscape" ? 1600 : processingOrientation === "rotated-landscape" ? 600 : 1000;
  const outputHeight = processingOrientation === "landscape" ? 600 : processingOrientation === "rotated-landscape" ? 1600 : 1500;
  const finalWidth = finalOrientation === "landscape" ? 1600 : 1000;
  const finalHeight = finalOrientation === "landscape" ? 600 : 1500;
  const filename = `hole-${String(hole).padStart(2, "0")}-map.webp`;

  const originalBase = await sharp(source, { raw: info })
    .extract(crop)
    .resize(outputWidth, outputHeight, { fit: "fill" })
    .png()
    .toBuffer();

  const base = await sharp(cleaned, { raw: info })
    .extract(crop)
    .resize(outputWidth, outputHeight, { fit: "fill" })
    .png()
    .toBuffer();

  let cleanOutput = sharp(base);
  if (rotateToLandscape) cleanOutput = cleanOutput.rotate(90);
  await cleanOutput.webp({ quality: 90, effort: 6, smartSubsample: true }).toFile(path.join(outputDirectory, filename));

  const tee = toPixel(route.tee);
  const green = toPixel(route.green);
  const toOutput = ([x, y]) => [
    ((x - crop.left) / crop.width) * outputWidth,
    ((y - crop.top) / crop.height) * outputHeight,
  ];
  const [teeX, teeY] = toOutput(tee);
  const [greenX, greenY] = toOutput(green);
  const deltaX = greenX - teeX;
  const deltaY = greenY - teeY;
  const routeLength = Math.hypot(deltaX, deltaY);
  const unitX = deltaX / routeLength;
  const unitY = deltaY / routeLength;
  const startX = teeX - unitX * routeLength * 0.23;
  const startY = teeY - unitY * routeLength * 0.23;
  const endX = greenX + unitX * routeLength * 0.07;
  const endY = greenY + unitY * routeLength * 0.07;
  const corridorWidth = Math.min(outputWidth, outputHeight) * (processingOrientation === "landscape" ? 0.48 : 0.42);
  const activeShape = hole === 2
    ? `<path d="M 58 160 C 270 145 500 155 655 105 C 760 72 835 115 900 210 C 990 315 1120 350 1265 385 C 1325 398 1360 430 1345 500 C 1332 548 1280 565 1205 548 C 1045 520 920 482 795 405 C 680 335 605 315 505 305 C 360 290 220 280 78 260 C 24 250 18 190 58 160 Z" fill="white"/>`
    : `<path d="M ${startX.toFixed(1)} ${startY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}" fill="none" stroke="white" stroke-width="${corridorWidth.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  let activeMask;
  if (hole === 3) {
    const holeThreeShape = `<path d="M 70 180 C 220 150 420 150 600 165 C 760 180 860 245 960 315 C 1045 375 1145 390 1180 450 C 1210 510 1165 575 1090 590 C 970 600 850 555 735 510 C 600 455 500 440 350 430 C 200 420 90 365 55 295 C 35 250 35 205 70 180 Z" fill="white"/>`;
    const finalMaskSvg = Buffer.from(
      `<svg width="1600" height="600" viewBox="0 0 1600 600" xmlns="http://www.w3.org/2000/svg">${holeThreeShape}</svg>`,
    );
    activeMask = await sharp(finalMaskSvg).rotate(-90).blur(8).png().toBuffer();
  } else {
    const maskSvg = Buffer.from(
      `<svg width="${outputWidth}" height="${outputHeight}" viewBox="0 0 ${outputWidth} ${outputHeight}" xmlns="http://www.w3.org/2000/svg">${activeShape}</svg>`,
    );
    activeMask = await sharp(maskSvg).blur(10).png().toBuffer();
  }
  const activeLayer = await sharp(base)
    .composite([{ input: activeMask, blend: "dest-in" }])
    .png()
    .toBuffer();
  const dimmed = await sharp(originalBase)
    .modulate(hole === 3 ? { brightness: 0.54, saturation: 0.24 } : { brightness: 0.76, saturation: 0.68 })
    .png()
    .toBuffer();

  const highlighted = await sharp(dimmed)
    .composite([{ input: activeLayer, blend: "over" }])
    .png()
    .toBuffer();

  let highlightedOutput = sharp(highlighted);
  if (rotateToLandscape) highlightedOutput = highlightedOutput.rotate(90);
  await highlightedOutput.webp({ quality: 90, effort: 6, smartSubsample: true }).toFile(path.join(highlightedOutputDirectory, filename));

  manifest[hole] = { image: `/golf/map-hole-crops-clean-v2/${filename}`, orientation: finalOrientation, width: finalWidth, height: finalHeight };
  highlightedManifest[hole] = { image: `/golf/map-hole-crops-highlight-v3/${filename}`, orientation: finalOrientation, width: finalWidth, height: finalHeight };
}

await fs.writeFile(path.join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await fs.writeFile(path.join(highlightedOutputDirectory, "manifest.json"), `${JSON.stringify(highlightedManifest, null, 2)}\n`);

const thumbWidth = 320;
const thumbHeight = 240;
const columns = 4;
const rows = 5;
const composites = [];

for (let hole = 1; hole <= 18; hole += 1) {
  const left = ((hole - 1) % columns) * thumbWidth;
  const top = Math.floor((hole - 1) / columns) * thumbHeight;
  const filename = path.join(highlightedOutputDirectory, `hole-${String(hole).padStart(2, "0")}-map.webp`);
  const thumbnail = await sharp(filename)
    .resize(thumbWidth, thumbHeight, { fit: "contain", background: "#f7f5ee" })
    .toBuffer();
  const label = Buffer.from(`<svg width="${thumbWidth}" height="${thumbHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="74" height="30" rx="15" fill="#14271d"/><text x="47" y="31" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#f4dfa0">HOLE ${hole}</text></svg>`);
  composites.push({ input: thumbnail, left, top }, { input: label, left, top });
}

await sharp({
  create: { width: thumbWidth * columns, height: thumbHeight * rows, channels: 3, background: "#f7f5ee" },
})
  .composite(composites)
  .jpeg({ quality: 92 })
  .toFile(path.join(highlightedOutputDirectory, "contact-sheet.jpg"));

console.log(`Created 18 cleaned, naturally oriented course crops in ${outputDirectory}`);
console.log(`Created 18 active-hole highlight crops in ${highlightedOutputDirectory}`);
