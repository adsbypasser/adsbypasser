#! /usr/bin/env python


from PIL import Image, ImageOps, ImageDraw
from cStringIO import StringIO
import base64
import subprocess
import cgi
import tempfile
import sys
import logging


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


def get_args():
    form = cgi.FieldStorage()

    if 'i' not in form:
        raise Exception(u'Image not specified.')

    if 'v' not in form:
        v = None
    else:
        v = form['v'].value

    return {
        'image': form['i'].value,
        'variant': v,
    }


def img_from_b64(b64):
    a = base64.b64decode(b64)
    b = StringIO(a)
    c = Image.open(b)
    return c


def preprocess_image(img, variant):
    # strip alpha channel if possible
    if img.mode == 'RGBA':
        img = strip_alpha(img)

    # post-process by variant
    if variant in VARIANTS:
        img = VARIANTS[variant](img)

    return img


def strip_alpha(img):
    bg = Image.new('RGBA', img.size, 'white')
    bg.paste(img, (0, 0), img)
    bg = bg.convert('RGB')
    bg = bg.convert('RGBA')
    return bg


def do_OCR(img):
    NTF = tempfile.NamedTemporaryFile
    # create a temporary image file for Tesseract OCR
    with NTF() as in_file, NTF() as out_file:
        img.save(in_file, img.format)

        r = subprocess.call(['tesseract', in_file.name, out_file.name])
        result_file_name = out_file.name + '.txt'

        with open(result_file_name, 'r') as result_file:
            result = result_file.read().strip()
            logging.info(result)
            return result


# TODO extract to factory
VARIANTS = {
    'ubucks.net': ubucks_net,
}


def main(args=None):
    if args is None:
        args = sys.argv

    logging.basicConfig(filename='captcha.log')

    # retrieve GET
    p = get_args()
    image = p['image']
    variant = p['variant']
    logging.info(image)
    logging.info(repr(variant))

    # convert base64 to image object
    image = img_from_b64(image)

    # preprocess image
    image = preprocess_image(image, variant)

    # do OCR
    result = do_OCR(image)

    sys.stdout.write('Content-Type: text/plain\r\n\r\n')
    print result

    return 0


if __name__ == '__main__':
    try:
        exit_code = main()
    except Exception as e:
        exit_code = 1

    sys.exit(exit_code)


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
