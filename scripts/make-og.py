from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
BG = (9, 9, 9)
FG = (250, 250, 250)
MUTED = (150, 155, 160)
SIGNAL = (245, 165, 36)  # --signal 38 92% 58%

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Subtle grid
grid = (22, 24, 26)
for x in range(0, W, 48):
    draw.line([(x, 0), (x, H)], fill=grid, width=1)
for y in range(0, H, 48):
    draw.line([(0, y), (W, y)], fill=grid, width=1)

# Warm ambient wash, top-centre
glow = Image.new("RGB", (W, H), BG)
gd = ImageDraw.Draw(glow)
gd.ellipse([W // 2 - 420, -320, W // 2 + 420, 180], fill=(58, 40, 12))
glow = glow.filter(ImageFilter.GaussianBlur(120))
img = Image.blend(img, glow, 0.5)
draw = ImageDraw.Draw(img)

mono_xb = "/usr/share/fonts/TTF/JetBrainsMono-ExtraBold.ttf"
mono_rg = "/usr/share/fonts/TTF/JetBrainsMono-Regular.ttf"

f_eyebrow = ImageFont.truetype(mono_rg, 22)
f_name = ImageFont.truetype(mono_xb, 92)
f_chip = ImageFont.truetype(mono_rg, 20)
f_url = ImageFont.truetype(mono_rg, 24)

cx = 90

# Eyebrow
draw.ellipse([cx, 158, cx + 10, 168], fill=SIGNAL)
draw.text((cx + 24, 148), "NEURAL COMMAND INTERFACE", font=f_eyebrow, fill=MUTED)

# Name: white, then amber. No gradient.
draw.text((cx, 205), "NIRMALYA", font=f_name, fill=FG)
draw.text((cx, 310), "MANDAL", font=f_name, fill=SIGNAL)

# Designation chips, mirroring the site's hero
chips = ["FULL STACK DEVELOPER", "WEB & MOBILE APPLICATIONS", "AI INTEGRATIONS"]
x = cx
y = 448
for c in chips:
    bbox = draw.textbbox((0, 0), c, font=f_chip)
    w = bbox[2] - bbox[0]
    pad = 14
    draw.rounded_rectangle([x, y, x + w + pad * 2, y + 38], radius=19, outline=(60, 64, 68), width=2)
    draw.text((x + pad, y + 8), c, font=f_chip, fill=MUTED)
    x += w + pad * 2 + 12

# Divider + footer
draw.line([(cx, 535), (W - 90, 535)], fill=(45, 48, 52), width=2)
draw.text((cx, 556), "devniru.in", font=f_url, fill=FG)
bbox = draw.textbbox((0, 0), "KOLKATA, INDIA · IST", font=f_url)
draw.text((W - 90 - (bbox[2] - bbox[0]), 556), "KOLKATA, INDIA · IST", font=f_url, fill=MUTED)

# NM monogram badge. Same geometry as src/components/site/brand-mark.tsx:
# one continuous path on a 24x24 grid, N's right leg doubling as M's left leg.
# Keep the two in step if either changes.
bx, by, bs = W - 90 - 84, 128, 84
draw.rounded_rectangle([bx, by, bx + bs, by + bs], radius=18, outline=(60, 64, 68), width=2, fill=(16, 17, 18))

MARK = [(4, 20), (4, 4), (12, 20), (12, 4), (16, 12), (20, 4), (20, 20)]
scale = 2.6                      # 24u -> ~62px inside the 84px plate
ox = bx + (bs - 24 * scale) / 2
oy = by + (bs - 24 * scale) / 2
draw.line(
    [(ox + x * scale, oy + y * scale) for x, y in MARK],
    fill=SIGNAL,
    width=round(2.5 * scale),
    joint="curve",               # PIL has no bevel; this keeps the peaks from spiking
)

img.save("/home/devniru2704/Personal Files/Programs/Github/portfolio-3.0/public/og.png", "PNG")
print("og.png written", img.size)
