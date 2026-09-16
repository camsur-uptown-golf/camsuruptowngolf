const sharp = require("sharp");

const input = "C:/Users/User/OneDrive/Desktop/banner11.jpg";
const output = "C:/Users/User/projects/camsuruptowngolf/public/experiences/banner11-dehazed.jpg";

sharp(input, { failOn: "none" })
  .rotate()
  .gamma(1.15)
  .modulate({ brightness: 0.96, saturation: 0.86 })
  .clahe({ width: 16, height: 16, maxSlope: 1 })
  .sharpen({ sigma: 0.65, m1: 0.35, m2: 0.7, x1: 2, y2: 10, y3: 20 })
  .jpeg({ quality: 95, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(output)
  .then(({ width, height, size }) => {
    console.log(JSON.stringify({ output, width, height, size }));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
