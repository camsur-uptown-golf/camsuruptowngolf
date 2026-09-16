import sharp from "sharp";

const input = "C:/Users/User/Downloads/map (1).png";
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

function detect(name, predicate) {
  const mask = new Uint8Array(width * height);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const offset = pixel * channels;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];
    if (a > 200 && predicate(r, g, b)) mask[pixel] = 1;
  }

  const components = [];
  const queue = new Int32Array(width * height);
  for (let start = 0; start < mask.length; start += 1) {
    if (mask[start] !== 1) continue;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    mask[start] = 2;
    let area = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    let sumX = 0;
    let sumY = 0;

    while (head < tail) {
      const pixel = queue[head++];
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      area += 1;
      sumX += x;
      sumY += y;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      const neighbors = [pixel - 1, pixel + 1, pixel - width, pixel + width];
      for (const neighbor of neighbors) {
        if (neighbor < 0 || neighbor >= mask.length || mask[neighbor] !== 1) continue;
        const neighborX = neighbor % width;
        if (Math.abs(neighborX - x) > 1) continue;
        mask[neighbor] = 2;
        queue[tail++] = neighbor;
      }
    }

    const componentWidth = maxX - minX + 1;
    const componentHeight = maxY - minY + 1;
    if (area >= 30 && area <= 3500 && componentWidth <= 90 && componentHeight <= 90) {
      components.push({
        name,
        area,
        x: Number(((sumX / area / width) * 100).toFixed(2)),
        y: Number(((sumY / area / height) * 100).toFixed(2)),
        width: componentWidth,
        height: componentHeight,
      });
    }
  }
  return components;
}

const red = detect("red", (r, g, b) => r > 150 && r > g * 1.7 && r > b * 1.5 && g < 125);
const blue = detect("blue", (r, g, b) => b > 100 && b > r * 1.35 && b > g * 1.12 && r < 120);
const yellow = detect("yellow", (r, g, b) => r > 165 && g > 145 && b < 105 && r > b * 1.8 && g > b * 1.6);
const pink = detect("pink", (r, g, b) => r > 145 && b > 95 && r > g * 1.35 && b > g * 1.15);
const black = detect("black", (r, g, b) => r < 20 && g < 25 && b < 20);
const tees = red.filter((item) => item.area >= 70 && item.area <= 100 && item.width >= 10 && item.width <= 12 && item.height >= 9 && item.height <= 12);
const coloredMarkers = [...red, ...blue, ...yellow, ...pink].filter(
  (item) => item.area >= 45 && item.area <= 180 && item.width >= 8 && item.width <= 18 && item.height >= 8 && item.height <= 18,
);
const pinCandidates = black.filter((item) => {
  if (item.area < 45 || item.area > 160 || item.width < 7 || item.width > 18 || item.height < 7 || item.height > 18) return false;
  return tees.every((tee) => Math.hypot(item.x - tee.x, item.y - tee.y) > 4.2);
});

const exactPins = pinCandidates.filter((item) => item.area >= 80 && item.area <= 88 && item.width === 11 && item.height === 10);
console.log(JSON.stringify({ tees, coloredMarkers, exactPins }, null, 2));
