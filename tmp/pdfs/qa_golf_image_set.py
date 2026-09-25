from pathlib import Path
import csv

from PIL import Image, ImageDraw


ROOT = Path("output/golf-club-images-4k-text-free")
SHEET = Path("tmp/pdfs/final_contact_sheet.jpg")
MANIFEST = ROOT / "image-index.csv"


with MANIFEST.open("r", encoding="utf-8-sig", newline="") as stream:
    rows = list(csv.DictReader(stream))

if len(rows) != 60:
    raise RuntimeError(f"Expected 60 manifest rows, got {len(rows)}")

items = []
for row in rows:
    path = ROOT / row["filename"]
    if not path.is_file():
        raise FileNotFoundError(path)
    with Image.open(path) as opened:
        image = opened.convert("RGB")
        width, height = image.size
        if max(width, height) != 3840:
            raise RuntimeError(f"Not 4K long-edge: {path.name} = {image.size}")
        if row["output_dimensions"] != f"{width}x{height}":
            raise RuntimeError(f"Manifest mismatch: {path.name}")
        image.thumbnail((320, 180), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (340, 220), "white")
        canvas.paste(image, ((340 - image.width) // 2, 8 + (180 - image.height) // 2))
        draw = ImageDraw.Draw(canvas)
        draw.text((10, 192), f"Page {int(row['page']):02d} / image {row['image_index']}", fill="black")
        draw.text((10, 207), row["title"][:48], fill="#333333")
        items.append(canvas)

columns = 4
rows_count = (len(items) + columns - 1) // columns
sheet = Image.new("RGB", (columns * 340, rows_count * 220), "#d8d8d8")
for index, item in enumerate(items):
    sheet.paste(item, ((index % columns) * 340, (index // columns) * 220))
sheet.save(SHEET, quality=92, subsampling=0)
print(f"verified={len(items)} contact_sheet={SHEET.resolve()}")
