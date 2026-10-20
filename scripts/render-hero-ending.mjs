import { spawn } from "node:child_process";
import { access, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

// Replace the flag print and closing logo, preserving the middle footage.
// Render the tracked flag first with scripts/render-flag-logo.py.
const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "public/hero-golf-club.mp4");
const output = path.join(root, "public/hero-golf-v3.mp4");
const work = path.join(root, "tmp/hero-logo-update");
const flagOpening = path.join(root, "tmp/hero-flag-update/flag-opening.mp4");
const fps = 60;
const flagFrames = 90;
const closingShot = 17.433333333;
// Include two clean mountain frames before fading the new closing logo in.
const openingFrames = 1048;
const totalFrames = 1216;
const closingFrames = totalFrames - openingFrames;

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, ["-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve() : reject(new Error(`FFmpeg exited with code ${code}`)));
  });
}

await mkdir(work, { recursive: true });
await access(flagOpening);
const svg = await readFile(path.join(root, "public/branding/camsur-uptown-golf-header-v4.svg"), "utf8");
// Render the complete SVG so the header's smaller GOLF and colors stay identical.
await sharp(Buffer.from(svg)).png().toFile(path.join(work, "logo-source.png"));

console.log("Extracting the clean mountain frame…");
await run([
  "-ss", String(closingShot), "-i", source, "-frames:v", "1", "-update", "1", "-y", path.join(work, "mountain.png"),
]);

const filters = [
  `[0:v]zoompan=z='1+0.000025*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=${closingFrames}:s=3840x2160:fps=${fps},setsar=1,format=yuv420p[bg]`,
  "[1:v]scale=-2:1440,format=rgba,fade=t=in:st=0.08:d=0.65:alpha=1[logo]",
  "[bg][logo]overlay=x=(W-w)/2:y=(H-h)/2:shortest=1,format=yuv420p[out]",
].join(";");

console.log("Rendering the new 4K closing shot with the original brand colors…");
await run([
  "-filter_complex_threads", "2", "-i", path.join(work, "mountain.png"),
  "-loop", "1", "-framerate", String(fps), "-i", path.join(work, "logo-source.png"),
  "-filter_complex", filters, "-map", "[out]", "-frames:v", String(closingFrames), "-an",
  "-c:v", "libx264", "-threads", "4", "-preset", "fast", "-crf", "18",
  "-profile:v", "high", "-video_track_timescale", "15360", "-movflags", "+faststart",
  "-y", path.join(work, "ending.mp4"),
]);

// Decode frame-accurate trims before joining. Stream-copy cuts through reordered
// H.264 frames can lose frames or produce unreliable seeking at the joins.
const join = [
  `[0:v]trim=end_frame=${flagFrames},setpts=PTS-STARTPTS[flag]`,
  `[1:v]trim=start_frame=${flagFrames}:end_frame=${openingFrames},setpts=PTS-STARTPTS[middle]`,
  `[2:v]trim=end_frame=${closingFrames},setpts=PTS-STARTPTS[ending]`,
  "[flag][middle][ending]concat=n=3:v=1:a=0,format=yuv420p[out]",
].join(";");
console.log("Joining all scenes with frame-accurate timing…");
await run([
  "-filter_complex_threads", "2", "-i", flagOpening, "-i", source, "-i", path.join(work, "ending.mp4"),
  "-filter_complex", join, "-map", "[out]", "-map", "1:a:0?",
  "-c:v", "libx264", "-threads", "4", "-preset", "fast", "-crf", "18", "-profile:v", "high",
  "-c:a", "copy", "-frames:v", String(totalFrames), "-r", String(fps), "-fps_mode", "cfr",
  "-video_track_timescale", "15360", "-movflags", "+faststart", "-y", output,
]);
console.log(`Saved ${path.relative(root, output)}`);
