import sys
import os
from PIL import Image

try:
    WIDTH = sys.argv[1]
    HEIGHT = sys.argv[2]
    DIR_PATH = sys.argv[3]
    IMG_SIZE = sys.argv[4]
except IndexError:
    print("Missing required argument(s).")
    sys.exit()


try:
    WIDTH = int(WIDTH)
    HEIGHT = int(HEIGHT)
    IMG_SIZE = int(IMG_SIZE)
except ValueError:
    print("The width, height and image size must be an integer.")
    sys.exit()

if not os.path.isdir(DIR_PATH):
    print("Directory not found.")
    sys.exit()

images = []
for file in os.listdir(DIR_PATH):
    if file.endswith(".png") or file.endswith(".jpg") or file.endswith(".jpeg"):
        if not file == "atlas.png":
            images.append(Image.open(f"{DIR_PATH}/{file}"))

atlas = Image.new(mode="RGBA", size=(WIDTH, HEIGHT))

with Image.open("/Users/oli4/.dotfiles/.python_scripts/not_render.png") as not_render:
    not_render = not_render.resize((IMG_SIZE, IMG_SIZE))
    for i in range(WIDTH // 4 + 1):
        for j in range(HEIGHT // 4 + 1):
            xy = (int(i * IMG_SIZE), int(j * IMG_SIZE))
            atlas.paste(not_render, xy)


top, left = 0, 0

row_height = 0

for im in images:
    if im.width + left > WIDTH:
        top += row_height
        left = 0
    atlas.paste(im, (left, top))
    left += im.width
    if im.height > row_height:
        row_height = im.height


atlas.save("atlas.png")
