import sharp from "sharp";

const input = "C:/Users/User/Downloads/map (1).png";
const output = "tmp/map-numbered-inspection.jpg";
const size = 1600;

const positions = {
  1: [36.5, 77.6],
  2: [49.88, 86.36],
  3: [74.91, 78.11],
  4: [87.3, 60.5],
  5: [73.6, 66.8],
  6: [66.6, 81.64],
  7: [74.46, 56.75],
  8: [61, 63],
  9: [49.9, 75.1],
  10: [41.86, 37.72],
  11: [70.57, 13.06],
  12: [74.09, 21.98],
  13: [33.7, 24.1],
  14: [28.6, 34.8],
  15: [38, 52.8],
  16: [24.9, 37.1],
  17: [18.41, 44.92],
  18: [33.6, 69],
};

const labels = Object.entries(positions)
  .map(([number, [x, y]]) => {
    const cx = (x / 100) * size;
    const cy = (y / 100) * size;
    return `<g><circle cx="${cx}" cy="${cy}" r="19" fill="#14271d" stroke="#f0d783" stroke-width="4"/><text x="${cx}" y="${cy + 7}" text-anchor="middle" font-family="Arial" font-size="22" font-weight="800" fill="#fff4c8">${number}</text></g>`;
  })
  .join("");

const grid = Array.from({ length: 9 }, (_, index) => {
  const value = (index + 1) * 10;
  const coordinate = (value / 100) * size;
  return `<path d="M${coordinate} 0V${size}M0 ${coordinate}H${size}" stroke="#8b2323" stroke-width="1" opacity="0.25"/><text x="${coordinate + 4}" y="18" font-family="Arial" font-size="13" fill="#8b2323">${value}</text><text x="4" y="${coordinate - 4}" font-family="Arial" font-size="13" fill="#8b2323">${value}</text>`;
}).join("");

const overlay = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${grid}${labels}</svg>`);

await sharp(input)
  .resize(size, size)
  .composite([{ input: overlay }])
  .jpeg({ quality: 90 })
  .toFile(output);

console.log(output);

const regions = [
  { name: "north-west", left: 0, top: 500, width: 1450, height: 1450 },
  { name: "north-east", left: 1250, top: 0, width: 1630, height: 1450 },
  { name: "south-west", left: 300, top: 1350, width: 1500, height: 1530 },
  { name: "south-east", left: 1350, top: 1250, width: 1530, height: 1630 },
];

for (const region of regions) {
  await sharp(input)
    .extract({ left: region.left, top: region.top, width: region.width, height: region.height })
    .flatten({ background: "#f7f5ee" })
    .jpeg({ quality: 94 })
    .toFile(`tmp/map-${region.name}.jpg`);
}
