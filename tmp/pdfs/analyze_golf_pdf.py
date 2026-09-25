from pathlib import Path
import json

from pypdf import PdfReader
from PIL import Image
from io import BytesIO


PDF = Path(r"C:\Users\User\Downloads\26.06.16 - Golf Club - Architectural Concept - VMS (1).pdf")
OUT = Path("tmp/pdfs/golf_pdf_inventory.json")


reader = PdfReader(PDF)
inventory = []
for page_number, page in enumerate(reader.pages, start=1):
    images = []
    for index, image_file in enumerate(page.images, start=1):
        width = height = None
        mode = None
        try:
            with Image.open(BytesIO(image_file.data)) as image:
                width, height = image.size
                mode = image.mode
        except Exception:
            pass
        images.append(
            {
                "index": index,
                "name": image_file.name,
                "bytes": len(image_file.data),
                "width": width,
                "height": height,
                "mode": mode,
            }
        )
    inventory.append(
        {
            "page": page_number,
            "text": page.extract_text() or "",
            "images": images,
        }
    )

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(inventory, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"pages={len(inventory)} images={sum(len(p['images']) for p in inventory)} output={OUT}")
