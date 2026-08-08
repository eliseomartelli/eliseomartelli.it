import sys
import subprocess
import textwrap

from PIL import Image, ImageDraw, ImageFont

import os
import glob
import random
import re
from datetime import datetime
from concurrent.futures import ProcessPoolExecutor

TAG_COLORS = {
    "Apple": ((236, 254, 255), (21, 94, 117)),
    "Network": ((253, 242, 248), (157, 23, 77)),
    "IoT": ((239, 246, 255), (30, 64, 175)),
    "Ansible": ((254, 242, 242), (153, 27, 27)),
    "Short": ((255, 247, 237), (154, 52, 18)),
    "Automation": ((240, 253, 244), (22, 101, 52)),
    "Gear": ((250, 250, 250), (39, 39, 42)),
    "Photography": ((238, 242, 255), (55, 48, 163)),
    "Programming": ((250, 250, 249), (41, 37, 36)),
    "Misc": ((255, 241, 242), (159, 18, 57)),
    "Ai": ((204, 251, 241), (17, 94, 89)),
    "Studies": ((245, 243, 255), (91, 33, 182)),
    "Music": ((250, 245, 255), (107, 33, 168)),
}
DEFAULT_TAG_COLOR = ((243, 244, 246), (31, 41, 55))


def format_human_date(date_str):
    if not date_str:
        return ""
    try:
        # Match YYYY-MM-DD
        dt = datetime.strptime(date_str[:10], "%Y-%m-%d")
        return dt.strftime("%B %d, %Y")  # e.g., "June 24, 2026"
    except Exception:
        return date_str


def get_random_hex():
    return (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


def process_single_post(args):
    post, out_path = args
    W, H = 1200, 630

    c1, c2, c3, c4 = (
        get_random_hex(),
        get_random_hex(),
        get_random_hex(),
        get_random_hex(),
    )

    small_img = Image.new("RGB", (2, 2))
    small_img.putpixel((0, 0), c1)
    small_img.putpixel((1, 0), c2)
    small_img.putpixel((0, 1), c3)
    small_img.putpixel((1, 1), c4)

    img = small_img.resize((W, H), Image.Resampling.BILINEAR)

    # Apply dark overlay
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 110))
    img.paste(overlay, (0, 0), overlay)

    draw = ImageDraw.Draw(img)

    try:
        font_path = "/System/Library/Fonts/Helvetica.ttc"
        font_date = ImageFont.truetype(font_path, 28)
        font_title = ImageFont.truetype(font_path, 60)
        font_excerpt = ImageFont.truetype(font_path, 30)
        font_tags = ImageFont.truetype(font_path, 22)
        font_brand = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 30)
    except Exception:
        font_date = font_title = font_excerpt = font_tags = font_brand = (
            ImageFont.load_default()
        )

    # Draw Date (Formatted e.g. "June 24, 2026")
    human_date = format_human_date(post["date"])
    draw.text((96, 96), human_date, fill=(255, 255, 255), font=font_date)

    # Draw Title
    title_lines = textwrap.wrap(post["title"], width=28)

    y_pos = 144
    for line in title_lines[:3]:
        draw.text((96, y_pos), line, fill=(255, 255, 255), font=font_title)
        y_pos += 68

    # Draw Excerpt
    if post.get("excerpt"):
        ex_line = textwrap.shorten(post["excerpt"], width=60, placeholder="...")
        draw.text((96, y_pos + 16), ex_line, fill=(220, 220, 220), font=font_excerpt)

    # Draw Tag Pills
    x_tag = 96
    y_tag = 524
    pill_h = 42
    font_ascent, font_descent = font_tags.getmetrics()
    font_total_h = font_ascent + font_descent

    for tag in post.get("tags", []):
        bg_col, text_col = TAG_COLORS.get(tag, DEFAULT_TAG_COLOR)
        bbox = draw.textbbox((0, 0), tag, font=font_tags)
        text_w = bbox[2] - bbox[0]
        pill_w = text_w + 36

        draw.rounded_rectangle(
            [x_tag, y_tag, x_tag + pill_w, y_tag + pill_h],
            radius=pill_h // 2,
            fill=bg_col,
        )
        # Center text inside fixed height pill
        text_y = y_tag + (pill_h - font_total_h) // 2
        draw.text((x_tag + 18, text_y), tag, fill=text_col, font=font_tags)
        x_tag += pill_w + 12

    # Draw Brand
    brand_text = "Eliseo Martelli"
    bbox_brand = draw.textbbox((0, 0), brand_text, font=font_brand)
    w_brand = bbox_brand[2] - bbox_brand[0]
    draw.text(
        (W - 96 - w_brand, 530), brand_text, fill=(255, 255, 255), font=font_brand
    )

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG")


def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    content_dir = os.path.join(base_dir, "content", "blog")
    static_og_dir = os.path.join(base_dir, "static", "og")

    tasks = []
    for filepath in glob.glob(os.path.join(content_dir, "*.*")):
        basename = os.path.basename(filepath)
        filename = os.path.splitext(basename)[0]

        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        title = ""
        excerpt = ""
        date_str = ""
        tags = []

        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                fm_text = parts[1]
                for line in fm_text.splitlines():
                    s = line.strip()
                    if s.startswith("title:"):
                        title = s.split(":", 1)[1].strip().strip("\"'")
                    elif s.startswith("excerpt:") or s.startswith("description:"):
                        if not excerpt:
                            excerpt = s.split(":", 1)[1].strip().strip("\"'")
                    elif s.startswith("date:"):
                        date_str = s.split(":", 1)[1].strip().strip("\"'")

                if "tags:" in fm_text:
                    tag_section = fm_text.split("tags:", 1)[1]
                    for t_line in tag_section.splitlines():
                        t_str = t_line.strip()
                        if t_str.startswith("-"):
                            tags.append(t_str.lstrip("-").strip())
                        elif t_str and ":" in t_str:
                            break

        out_png = os.path.join(static_og_dir, f"{filename}.png")
        tasks.append(
            (
                {
                    "title": title or filename,
                    "excerpt": excerpt,
                    "date": date_str,
                    "tags": tags,
                },
                out_png,
            )
        )

    with ProcessPoolExecutor() as executor:
        list(executor.map(process_single_post, tasks))

    print(f"Successfully generated {len(tasks)} OpenGraph images in static/og/")


if __name__ == "__main__":
    main()
