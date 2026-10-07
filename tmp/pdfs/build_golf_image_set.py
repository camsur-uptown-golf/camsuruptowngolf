from io import BytesIO
from pathlib import Path
import csv
import re

from PIL import Image, ImageFilter
from pypdf import PdfReader


PDF = Path(r"C:\Users\User\Downloads\26.06.16 - Golf Club - Architectural Concept - VMS (1).pdf")
OUT = Path("output/golf-club-images-4k-text-free")
TARGET_LONG_EDGE = 3840


TITLES = {
    1: ["Cover Artwork"],
    2: ["The Golf Club"],
    3: ["The Game"],
    7: ["The Idea"],
    8: ["Site Context Masterplan"],
    9: ["Aerial Overview - Clubhouse and Pool Deck"],
    10: ["Landscape and Water"],
    11: ["The Estate - CamSur"],
    13: ["Aerial View - Heart of the Pitch"],
    14: ["Form and Concept"],
    15: ["Material 01 - Bronze", "Material 02 - Travertine", "Material 03 - Walnut", "Material 04 - Glass"],
    16: ["The Stack - Section Axonometric"],
    17: ["Environmental Strategy - Sun Daylight Landscape"],
    18: ["Ground Floor Plan"],
    19: ["Lower Floor -1 Plan"],
    20: ["Rooftop +1 Plan"],
    21: ["Key Section A", "Key Section B"],
    24: ["The Approach - West Elevation"],
    25: ["Porte-Cochere Drop-Off"],
    26: ["Arrival Sequence - Bronze Drum", "Arrival Sequence - Drop-Off and Threshold", "Arrival Sequence - Welcome Hall"],
    28: ["Entrance Hall - The Oculus"],
    29: ["Reception Desk"],
    30: ["Golf Shop - Retail"],
    31: ["Golf Shop - Fitting and Display", "Golf Shop - Counter and Apparel"],
    33: ["Locker Rooms Plan"],
    34: ["Locker Room - Walnut"],
    35: ["Showers and Wellness"],
    36: ["Trophy Corridor - Heritage"],
    38: ["Members Lounge - Upper Floor"],
    39: ["Coffee Bar - Lounge Detail"],
    40: ["Rear Terrace - Al Fresco Dining"],
    42: ["Practice Bays - T-Point"],
    43: ["Lower Floor Program"],
    44: ["The Practice Bay"],
    46: ["VIP Entrance - Private Drum"],
    47: ["VIP Lounge - Overlooking the Pitch"],
    48: ["VIP Dining - From the Kitchen", "VIP Bar - Cocktails and Fine Pours"],
    49: ["VIP Suites"],
    51: ["Rooftop Bar and Restaurant"],
    52: ["Rooftop - Lounge Terrace", "Rooftop - Sunset Dining"],
    53: ["Pool and Sky Gardens"],
    56: ["Material Palette"],
    57: ["Detail - Bronze Fins", "Detail - Topographic Textiles", "Detail - Sculpted Stone"],
    58: ["Landscape and Climate"],
    59: ["A Day at the Club - Morning", "A Day at the Club - Afternoon", "A Day at the Club - Evening"],
    60: ["The Vision Realised"],
    61: ["VM Studio Logo"],
}


def safe_name(value: str) -> str:
    value = re.sub(r'[<>:"/\\|?*]', "-", value)
    value = re.sub(r"\s+", " ", value).strip().rstrip(".")
    return value


def resize_to_4k(source: Image.Image) -> tuple[Image.Image, str]:
    width, height = source.size
    scale = TARGET_LONG_EDGE / max(width, height)
    new_size = (max(1, round(width * scale)), max(1, round(height * scale)))
    if new_size == source.size:
        return source.copy(), "unchanged"
    resized = source.resize(new_size, Image.Resampling.LANCZOS)
    if scale > 1:
        if resized.mode in ("RGB", "RGBA", "L"):
            resized = resized.filter(ImageFilter.UnsharpMask(radius=1.0, percent=55, threshold=3))
        action = "upscaled"
    else:
        action = "downscaled"
    return resized, action


OUT.mkdir(parents=True, exist_ok=True)
reader = PdfReader(PDF)
rows = []
output_count = 0

for page_number, page in enumerate(reader.pages, start=1):
    images = list(page.images)
    if not images:
        continue
    expected_titles = TITLES.get(page_number)
    if expected_titles is None:
        raise RuntimeError(f"Missing semantic titles for page {page_number}")
    if len(expected_titles) != len(images):
        raise RuntimeError(
            f"Page {page_number}: {len(images)} image(s) but {len(expected_titles)} title(s)"
        )

    for image_index, (image_file, title) in enumerate(zip(images, expected_titles), start=1):
        with Image.open(BytesIO(image_file.data)) as opened:
            source = opened.copy()
        original_size = source.size
        final, action = resize_to_4k(source)

        source_suffix = Path(image_file.name).suffix.lower()
        preserve_png = source_suffix == ".png" or "A" in final.getbands()
        suffix = ".png" if preserve_png else ".jpg"
        filename = safe_name(f"Page {page_number:02d} - {title}") + suffix
        destination = OUT / filename

        if suffix == ".png":
            final.save(destination, format="PNG", optimize=True)
        else:
            if final.mode != "RGB":
                final = final.convert("RGB")
            final.save(destination, format="JPEG", quality=96, subsampling=0, optimize=True)

        output_count += 1
        rows.append(
            {
                "page": page_number,
                "image_index": image_index,
                "title": title,
                "source_object": image_file.name,
                "source_dimensions": f"{original_size[0]}x{original_size[1]}",
                "output_dimensions": f"{final.size[0]}x{final.size[1]}",
                "resize_action": action,
                "filename": filename,
            }
        )

manifest = OUT / "image-index.csv"
with manifest.open("w", newline="", encoding="utf-8-sig") as stream:
    writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)

readme = OUT / "README.txt"
readme.write_text(
    "Golf Club architectural concept image set\n"
    "Source: 26.06.16 - Golf Club - Architectural Concept - VMS (1).pdf\n"
    f"Images: {output_count}\n"
    "Processing: original embedded raster images extracted without PDF text overlays; "
    "resampled to a 3840-pixel long edge while preserving aspect ratio.\n"
    "Naming: Page number + the image's presentation title or content label.\n"
    "See image-index.csv for source object names and exact dimensions.\n",
    encoding="utf-8",
)

if output_count != 60:
    raise RuntimeError(f"Expected 60 outputs, produced {output_count}")

print(f"created={output_count} folder={OUT.resolve()}")
