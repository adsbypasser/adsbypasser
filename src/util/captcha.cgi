#! /usr/bin/env python

from PIL import Image, ImageOps, ImageDraw
from cStringIO import StringIO
import base64
import subprocess
import cgi
import tempfile
import os
import sys

k, l = tempfile.mkstemp()
k = open(l, 'w')
vs = {}


def ubucks_net(a):
    b = a.convert('L')
    b = ImageOps.invert(b)

    c = Image.new('L', a.size, color=255)
    d = ImageDraw.Draw(c)
    for i in xrange(5):
        if i % 2 == 0:
            d.rectangle((50*i, 0, 50+50*i-1, 25-1), fill=0)
        else:
            d.rectangle((50*i, 25, 50+50*i-1, 50-1), fill=0)

    e = a.copy()
    e.paste(b, (0, 0), c)
    return e
vs['ubucks.net'] = ubucks_net


def get_args():
    form = cgi.FieldStorage()
    if 'i' not in form:
        raise Exception()
    if 'v' not in form:
        v = None
    else:
        v = form['v'].value
    return (
        form['i'].value,
        v,
    )

def img_from_b64(b64):
    a = base64.b64decode(b64)
    b = StringIO(a)
    c = Image.open(b)
    return c

def strip_alpha(img):
    bg = Image.new('RGBA', img.size, 'white')
    bg.paste(img, (0, 0), img)
    bg = bg.convert('RGB')
    bg = bg.convert('RGBA')
    return bg

def main():
    i, v = get_args()
    k.write(i + '\n')
    k.write(repr(v) + '\n')

    b = img_from_b64(i)
    f = b.format

    if b.mode == 'RGBA':
        b = strip_alpha(b)

    if v in vs:
        b = vs[v](b)

    a, o = tempfile.mkstemp()

    b.save(o, f)

    a, r = tempfile.mkstemp()

    b = subprocess.call(['tesseract', o, r])
    r = r + '.txt'

    f = open(r, 'r')
    a = f.read().strip()
    f.close()
    k.write(a + '\n')

    os.remove(o)
    os.remove(r)

    print a


print 'Content-Type: text/plain'
print

try:
    main()
except Exception:
    k.write('exception\n')
