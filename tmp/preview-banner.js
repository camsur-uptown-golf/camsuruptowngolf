const sharp = require("sharp");

sharp("C:/Users/User/OneDrive/Desktop/banner11.jpg", { failOn: "none" })
  .resize({ width: 1600 })
  .gamma(1.15)
  .modulate({ brightness: 0.96, saturation: 0.86 })
  .clahe({ width: 16, height: 16, maxSlope: 1 })
  .sharpen({ sigma: 0.65, m1: 0.35, m2: 0.7, x1: 2, y2: 10, y3: 20 })
  .jpeg({ quality: 86 })
  .toFile("C:/Users/User/projects/camsuruptowngolf/tmp/banner11-dehazed-preview.jpg")
  .then(console.log)
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
