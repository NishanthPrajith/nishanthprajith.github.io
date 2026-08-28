import json
import re
import subprocess
from pathlib import Path
from PIL import Image, ImageOps
import exiftool
from fractions import Fraction

folder_name = "versailles"
group = "Versailles, FR"

folder = Path(f"./{folder_name}")
exts = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"}
thumb_max_size = 800
thumbs_dir = folder / "thumbs"
thumbs_dir.mkdir(exist_ok=True)

def get_focus_data(image_path: Path) -> tuple[str, float, float]:
    with exiftool.ExifToolHelper() as et:
        meta = et.get_metadata([str(image_path)])[0]

    fraction = Fraction(meta.get("Composite:ShutterSpeed")).limit_denominator(10000)
    return meta.get("EXIF:FNumber"), meta.get("EXIF:FocalLength"), f"{fraction.numerator}/{fraction.denominator}"

def get_aspect_ratio(image_path: Path) -> float:
    img = Image.open(image_path)
    exif = ImageOps.exif_transpose(img)

    width, height = exif.size
    if height == 0:
        raise ValueError(f"Invalid height for {image_path}")

    return round(width / height, 4)


files = sorted(
    f
    for f in folder.iterdir()
    if f.is_file() and f.suffix.lower() in exts
)

data = []
aspect_counts: dict[float, int] = {}

for i, file_path in enumerate(files, start=1):
    # {folder_name}-{i}{file_path.suffix.lower()}
    new_name = folder / f"{folder_name}-{i}{file_path.suffix.lower()}"
    file_path.rename(new_name)
    print(f"{file_path.name} -> {new_name.name}")

    aspect_ratio = get_aspect_ratio(new_name)
    print(f"  aspect ratio -> {aspect_ratio}")

    thumb_path = thumbs_dir / new_name.name
    subprocess.run(
        [
            "sips",
            "-Z",
            str(thumb_max_size),
            str(new_name),
            "--out",
            str(thumb_path),
        ],
        check=True,
    )

    focus, focal_length, shutter_speed = get_focus_data(new_name)

    print(f"  thumb -> {thumb_path}")
    print(f"  focus -> {focus}")
    print(f"  focal length -> {focal_length}")
    print(f"  shutter speed -> {shutter_speed}")

    data.append(
        {
            "id": f"{folder_name}-{i}",
            "title": f"Focus: f/{focus}, Focal Length: {focal_length}mm, Shutter Speed: {shutter_speed}s",
            "image": f"/photos/{folder.name}/{new_name.name}",
            "thumbnail": f"/photos/{folder.name}/thumbs/{new_name.name}",
            "aspectRatio": aspect_ratio,
            "group": group,
        }
    )

print("\nAspect ratio summary:")
for aspect_ratio, count in sorted(aspect_counts.items()):
    print(f"  {aspect_ratio}: {count} photo(s)")

print("\n" + json.dumps(data, indent=2))
