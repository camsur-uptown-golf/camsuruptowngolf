"""Replace only GOLF CLUB on the opening flag, following the original fabric.

Run with tmp/hero-flag-update/venv/bin/python after installing numpy/opencv.
The crest, CAMSUR UPTOWN, cloth, and camera movement stay in the footage.
"""

import subprocess
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "tmp/hero-flag-update"
SOURCE = ROOT / "public/hero-golf-club.mp4"
OUTPUT = WORK / "flag-opening.mp4"
FRAMES = 90
FPS = 60
# Coordinates at half the native resolution. This surrounds the moving print.
RX, RY, RW, RH = 620, 290, 560, 550
# Hand-checked corners of the original lettering (TL, TR, BR, BL). Short
# keyframe intervals keep the insert attached as a fold obscures the print.
TRACK = {
    0: [[175, 382], [282, 348], [284, 363], [176, 397]],
    12: [[190, 384], [293, 344], [294, 359], [191, 399]],
    24: [[203, 378], [312, 346], [313, 362], [204, 394]],
    36: [[225, 363], [323, 337], [324, 352], [226, 378]],
    42: [[236, 350], [324, 325], [325, 340], [237, 365]],
    48: [[246, 347], [326, 323], [327, 338], [247, 362]],
    54: [[256, 338], [324, 318], [325, 333], [257, 353]],
    60: [[264, 330], [319, 317], [320, 332], [265, 345]],
    66: [[272, 326], [316, 311], [317, 326], [273, 341]],
    72: [[278, 311], [320, 296], [321, 311], [279, 326]],
    78: [[270, 300], [318, 284], [319, 299], [271, 315]],
    84: [[264, 298], [318, 282], [319, 296], [265, 312]],
    89: [[264, 297], [318, 281], [319, 295], [265, 311]],
}


def prepare_reference():
    new = cv2.imread(str(ROOT / "public/branding/camsur-uptown-golf-header-v4.png"), cv2.IMREAD_UNCHANGED)
    artwork = []
    for crop in (new[1213:1312, 342:739], new[1353:1404, 276:810]):
        alpha = crop[:, :, 3:4].astype(np.float32) / 255
        # Keep transparent source colors out of filtered edges.
        artwork.append(np.concatenate((crop[:, :, :3].astype(np.float32) * alpha, alpha), axis=2))
    return artwork


def lettering_quad(index):
    keys = list(TRACK)
    before = max(key for key in keys if key <= index)
    after = min(key for key in keys if key >= index)
    weight = 0 if before == after else (index - before) / (after - before)
    return (np.array(TRACK[before], np.float32) * (1 - weight)
            + np.array(TRACK[after], np.float32) * weight) * 2


def replace_line(native, artwork, index):
    quad = lettering_quad(index)
    removal_quad = quad.copy()
    # The flag's original lettering curves upwards during its first billow.
    correction = np.interp(index, [0, 12, 24, 36, 42, 89], [0, -8, -10, -3, 0, 0]) * 2
    removal_quad[:2, 1] += correction
    removal_quad[2:] += (quad[2:] - quad[[1, 0]]) * 1.6
    mask = np.zeros(native.shape[:2], np.uint8)
    cv2.fillConvexPoly(mask, np.round(removal_quad).astype(np.int32), 255)
    mask = cv2.dilate(mask, np.ones((7, 7), np.uint8))
    if index >= 68:
        # Protect the visible UPTOWN stem where the fold covers the old GOLF.
        left_edge = int((quad[0, 0] * 0.75 + quad[1, 0] * 0.25))
        mask[:, :left_edge] = 0
    bright_cloth = ((native[:, :, 0] > 135) & (native[:, :, 1] > 125)
                    & (native[:, :, 2] > 100)).astype(np.uint8) * 255
    contours, _ = cv2.findContours(bright_cloth, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cloth_mask = np.zeros_like(mask)
    cv2.drawContours(cloth_mask, [c for c in contours if cv2.contourArea(c) > 1000], -1, 255, cv2.FILLED)
    # Keep clean fabric around the outer edge so the fill cannot pull grass
    # into the flag, and clip the new print when the fabric folds over itself.
    mask &= cv2.erode(cloth_mask, np.ones((11, 11), np.uint8))
    cloth = cv2.inpaint(native, mask, 7, cv2.INPAINT_TELEA)
    # Match the header's GOLF proportion: narrower than UPTOWN, with a
    # moderate cap height. The source flag's GOLF CLUB was much smaller.
    center = quad.mean(axis=0)
    horizontal = (quad[1] + quad[2] - quad[0] - quad[3]) / 4
    vertical = (quad[2] + quad[3] - quad[0] - quad[1]) / 4
    horizontal *= 0.8
    vertical *= 1.35
    current_art = np.zeros((*native.shape[:2], 4), np.float32)
    for number, art in enumerate(artwork):
        anchor = center if number == 0 else center + vertical * 2.1
        across = horizontal if number == 0 else horizontal * 1.1
        down = vertical if number == 0 else vertical * 0.34
        target = np.float32([
            anchor - across - down, anchor + across - down,
            anchor + across + down, anchor - across + down,
        ])
        height, width = art.shape[:2]
        transform = cv2.getPerspectiveTransform(
            np.float32([[0, 0], [width, 0], [width, height], [0, height]]), target)
        current_art += cv2.warpPerspective(art, transform, (native.shape[1], native.shape[0]))
    # Match the filmed print's soft edges and let cloth texture show through.
    current_art = cv2.GaussianBlur(current_art, (0, 0), 0.7) * 0.92
    current_art *= cloth_mask[:, :, None].astype(np.float32) / 255
    alpha = current_art[:, :, 3:4]
    lighting = cv2.GaussianBlur(cloth, (0, 0), 5).astype(np.float32) / 255
    printed = current_art[:, :, :3] * lighting * 0.94
    composite = cloth.astype(np.float32) * (1 - alpha) + printed
    native[:] = np.clip(composite, 0, 255).astype(np.uint8)
    return mask


def main():
    cv2.setNumThreads(4)
    WORK.mkdir(parents=True, exist_ok=True)
    artwork = prepare_reference()
    ffmpeg = subprocess.check_output(["node", "-p", "require('ffmpeg-static')"], cwd=ROOT, text=True).strip()
    encoder = subprocess.Popen([
        ffmpeg, "-hide_banner", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24",
        "-s", "3840x2160", "-r", str(FPS), "-i", "pipe:0", "-frames:v", str(FRAMES), "-an",
        "-c:v", "libx264", "-threads", "4", "-preset", "fast", "-crf", "18", "-profile:v", "high",
        "-pix_fmt", "yuv420p", "-video_track_timescale", "15360", "-movflags", "+faststart", "-y", str(OUTPUT),
    ], stdin=subprocess.PIPE, cwd=ROOT)
    video = cv2.VideoCapture(str(SOURCE))
    try:
        for index in range(FRAMES):
            ok, frame = video.read()
            if not ok:
                raise RuntimeError(f"Missing source frame {index}")
            native = frame[RY * 2:(RY + RH) * 2, RX * 2:(RX + RW) * 2]
            mask = replace_line(native, artwork, index)

            encoder.stdin.write(frame.tobytes())
            if index in (0, 24, 42, 60, 84, 89):
                cv2.imwrite(str(WORK / f"flag-updated-{index:03}.jpg"), frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
                cv2.imwrite(str(WORK / f"print-updated-{index:03}.png"), cv2.resize(native, (RW, RH)))
                cv2.imwrite(str(WORK / f"mask-{index:03}.png"), cv2.resize(mask, (RW, RH)))
            if index % 15 == 0:
                print(f"Tracked and rendered opening flag {index + 1}/{FRAMES}", flush=True)
    finally:
        video.release()
        encoder.stdin.close()
        return_code = encoder.wait()
    if return_code:
        raise RuntimeError(f"FFmpeg exited with {return_code}")
    print(f"Saved {OUTPUT.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    main()
