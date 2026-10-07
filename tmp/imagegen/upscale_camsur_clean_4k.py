from pathlib import Path

from PIL import Image, ImageFilter


SOURCE = Path("tmp/imagegen/camsur-clean-raw")
OUTPUT = Path("output/CamSur Clean Images - 4K")
TARGET_LONG_EDGE = 3840


OUTPUT.mkdir(parents=True, exist_ok=True)

for source_path in sorted(SOURCE.glob("*.png")):
    with Image.open(source_path) as opened:
        image = opened.convert("RGB")

    width, height = image.size
    scale = TARGET_LONG_EDGE / max(width, height)
    output_size = (round(width * scale), round(height * scale))
    image = image.resize(output_size, Image.Resampling.LANCZOS)
    image = image.filter(ImageFilter.UnsharpMask(radius=1.1, percent=55, threshold=3))

    output_path = OUTPUT / f"{source_path.stem}-4K.jpg"
    image.save(output_path, format="JPEG", quality=96, subsampling=0, optimize=True)
    print(f"{output_path.name}: {width}x{height} -> {output_size[0]}x{output_size[1]}")

