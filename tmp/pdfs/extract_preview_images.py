from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from pypdf import PdfReader


PDF = Path(r"C:\Users\User\Downloads\26.06.16 - Golf Club - Architectural Concept - VMS (1).pdf")
RAW = Path("tmp/pdfs/raw_images")
SHEET = Path("tmp/pdfs/contact_sheet.jpg")


RAW.mkdir(parents=True, exist_ok=True)
reader = PdfReader(PDF)
items = []
for page_number, page in enumerate(reader.pages, start=1):
    for image_index, image_file in enumerate(page.images, start=1):
        suffix = Path(image_file.name).suffix.lower() or ".bin"
        output = RAW / f"p{page_number:02d}_{image_index:02d}_{Path(image_file.name).stem}{suffix}"
        output.write_bytes(image_file.data)
        try:
            with Image.open(BytesIO(image_file.data)) as source:
                thumb = source.convert("RGB")
                thumb.thumbnail((320, 180), Image.Resampling.LANCZOS)
                canvas = Image.new("RGB", (340, 220), "white")
                x = (340 - thumb.width) // 2
                y = 8 + (180 - thumb.height) // 2
                canvas.paste(thumb, (x, y))
                draw = ImageDraw.Draw(canvas)
                draw.text((10, 194), f"Page {page_number:02d} / image {image_index}", fill="black")
                items.append(canvas)
        except Exception:
            pass

columns = 4
rows = (len(items) + columns - 1) // columns
sheet = Image.new("RGB", (columns * 340, rows * 220), "#d8d8d8")
for idx, item in enumerate(items):
    sheet.paste(item, ((idx % columns) * 340, (idx // columns) * 220))
sheet.save(SHEET, quality=92, subsampling=0)
print(f"extracted={len(items)} raw_dir={RAW} contact_sheet={SHEET}")
