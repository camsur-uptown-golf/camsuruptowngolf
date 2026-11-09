import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Keep the original artwork pixel-for-pixel; replace only its final numeral
// with the seven from the imagegen text edit. Originals remain as sources.
const root = fileURLToPath(new URL("../", import.meta.url));
const digit = path.join(root, "output/imagegen/est-2027/digit-seven.png");
const variants = [
  ["header-v4", "header-2027", [641, 1345, 49, 70], [642, 1356, 34, 47]],
  ["master", "master-2027", [390, 1118, 32, 44], [393, 1126, 26, 36]],
  ["master-light", "master-light-2027", [260, 746, 23, 29], [262, 751, 17, 24]],
];

await mkdir(path.join(root, "public/branding"), { recursive: true });
for (const [sourceName, outputName, removal, target] of variants) {
  const prefix = path.join(root, "public/branding/camsur-uptown-golf-");
  const { data, info } = await sharp(`${prefix}${sourceName}.png`)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [left, top, width, height] = target;
  // Match the original numeral's row-by-row gold/green, without the generated
  // edit's extra bevel. Only use the generated numeral's silhouette.
  const samples = [[], [], []];
  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
      const offset = (y * info.width + x) * 4;
      if (data[offset + 3] > 200) {
        for (let c = 0; c < 3; c++) samples[c].push(data[offset + c]);
      }
    }
  }
  const median = (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  const fallback = samples.map(median);
  const rowColors = Array.from({ length: height }, (_, row) => {
    const colors = [[], [], []];
    for (let x = left; x < left + width; x++) {
      const offset = ((top + row) * info.width + x) * 4;
      if (data[offset + 3] > 200) {
        for (let c = 0; c < 3; c++) colors[c].push(data[offset + c]);
      }
    }
    return colors.map((values, c) => values.length ? median(values) : fallback[c]);
  });
  const mask = await sharp(digit).resize(width, height).ensureAlpha().raw().toBuffer();
  const [rx, ry, rw, rh] = removal;
  for (let y = ry; y < ry + rh; y++) {
    data.fill(0, (y * info.width + rx) * 4, (y * info.width + rx + rw) * 4);
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = ((top + y) * info.width + left + x) * 4;
      const alpha = mask[(y * width + x) * 4 + 3];
      data.set([...rowColors[y], alpha], offset);
    }
  }
  const output = `${prefix}${outputName}.png`;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(output);
  console.log(path.relative(root, output));
  if (sourceName === "header-v4") {
    const png = await readFile(output);
    await writeFile(`${prefix}${outputName}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1086" height="1448" viewBox="0 0 1086 1448" role="img" aria-label="CamSur Uptown Golf, established 2027"><image width="1086" height="1448" href="data:image/png;base64,${png.toString("base64")}"/></svg>\n`);
  }
}

// Integrate only the edited date patches from the photo text edits. Feather
// the two-pixel edge into the original ball; retain every other photo pixel.
const photos = [
  ["events/golf-tournaments-full-logo-2026-clean-4k-v3.png", "events/golf-tournaments-full-logo-2027.png", "event", [1243, 841, 72, 24]],
  ["hero-images/tee-time-v3-logo.webp", "hero-images/tee-time-2027-logo.webp", "tee-time", [1094, 665, 49, 15]],
];
for (const [source, output, name, box] of photos) {
  const { data, info } = await sharp(path.join(root, "public", source))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const patch = await sharp(path.join(root, `output/imagegen/est-2027/${name}-date-patch.png`))
    .ensureAlpha().raw().toBuffer();
  const [left, top, width, height] = box;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const weight = Math.min(1, x / 2, y / 2, (width - 1 - x) / 2, (height - 1 - y) / 2);
      const dest = ((top + y) * info.width + left + x) * 4;
      const src = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) data[dest + c] = Math.round(data[dest + c] * (1 - weight) + patch[src + c] * weight);
    }
  }
  const image = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  const destination = path.join(root, "public", output);
  if (output.endsWith(".webp")) await image.webp({ lossless: true }).toFile(destination);
  else await image.png().toFile(destination);
  console.log(path.relative(root, destination));
}

await copyFile(path.join(root, "public/branding/camsur-uptown-golf-master-2027.png"), path.join(root, "mobile/assets/brand/master-logo.png"));
await sharp(path.join(root, "public/events/golf-tournaments-full-logo-2027.png"))
  .resize(600, 338).jpeg({ quality: 90 }).toFile(path.join(root, "mobile/assets/brand/event-tournament.jpg"));
