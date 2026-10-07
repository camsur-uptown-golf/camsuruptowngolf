const sharp = require('sharp');
const fs = require('fs');
const sp = process.env.SP;
const jobs = [
  /* Bukang-liwayway sa course — ang bandang larawan sa /packages. */
  [sp + '/gen3-2k.png', 'public/packages/course-dawn-wide.webp', 2560, 1097],
  /* Ang daan papasok — hero ng /getting-here. Katutubong sukat lang
     (1344x752): huwag palakihin, wala namang naidaragdag na detalye. */
  [sp + '/gen4.png', 'public/getting-here-hero.webp', 1344, 752],
  /* Ang clubhouse — hero ng /faq. Meron na ito, 4K, at iisa ang marka
     nito sa ibang pahina. */
  ['public/clubhouse-rooftop-pool-gardens-clean-4k-v2.png', 'public/faq-hero.webp', 2560, 1440],
];
(async () => {
  for (const [src, dest, w, h] of jobs) {
    await sharp(src).resize(w, h, { fit: 'cover', position: 'centre' }).webp({ quality: 84 }).toFile(dest);
    const m = await sharp(dest).metadata();
    console.log(dest, m.width + 'x' + m.height, Math.round(fs.statSync(dest).size / 1024) + 'KB');
  }
})();
