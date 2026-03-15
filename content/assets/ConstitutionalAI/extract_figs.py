#!/usr/bin/env python3
"""Extract key figures from Constitutional AI PDF.

Usage:
    python3 extract_figs.py

After running, delete this script.
"""
import fitz

pdf = "path/to/2212.08073.pdf"  # Update this path
out = "."

doc = fitz.open(pdf)
# Figure 1 - method overview (page 2)
p = doc[1]; pix = p.get_pixmap(dpi=200, clip=fitz.Rect(50, 30, 560, 310)); pix.save(out + "/fig1-method-overview.png"); print("fig1 ok")
# Figure 2 - helpfulness vs harmlessness Elo (page 3)
p = doc[2]; pix = p.get_pixmap(dpi=200, clip=fitz.Rect(85, 30, 510, 320)); pix.save(out + "/fig2-helpfulness-vs-harmlessness-elo.png"); print("fig2 ok")
# Figure 8 - RL training curves (page 12)
p = doc[11]; pix = p.get_pixmap(dpi=200, clip=fitz.Rect(60, 30, 540, 260)); pix.save(out + "/fig8-rl-training-curves.png"); print("fig8 ok")
doc.close()
print("Done! Now delete this script.")
