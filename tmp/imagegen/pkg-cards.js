const sharp = require('sharp');
const fs = require('fs');
const sp = process.env.SP;
/* Katutubong sukat lang (1024x688 ang galing sa generator): ang 3:2 na
   pagkakahiwa ay 1024x683. Huwag itong palakihin — 444px lang ang card
   sa xl, kaya 888px ang kailangan sa 2x at sapat na ang 1024. */
const jobs = [
  ['gen1.png', 'public/packages/stay-and-play-card.webp'],
  ['gen2.png', 'public/packages/buddy-trip-card.webp'],
];
(async () => {
  for (const [src, dest] of jobs) {
    await sharp(sp + '/' + src)
      .resize(1024, 683, { fit: 'cover', position: 'centre' })
      .webp({ quality: 86 })
      .toFile(dest);
    const m = await sharp(dest).metadata();
    console.log(dest, m.width + 'x' + m.height, Math.round(fs.statSync(dest).size / 1024) + 'KB');
  }
})();
