from __future__ import unicode_literals
from __future__ import absolute_import

import sys

from .util import to_abs_path, read_config


def read_file(path):
    path = to_abs_path(path)
    with open(path, 'r') as fin:
        data = fin.read().decode('utf-8')
    return data


def main(args=None):
    if args is None:
        args = sys.argv

    config = read_config()
    script_full = read_file('../../dest/adsbypasser.user.js')
    script_lite = read_file('../../dest/adsbypasserlite.user.js')

    from mirrors.greasyfork import exec_ as greasyfork
    greasyfork(config['mirrors']['greasyfork'], 'full', 'lite', script_full)
    greasyfork(config['mirrors']['greasyfork'], 'lite', 'full', script_lite)

    from mirrors.openuserjs import exec_ as openuserjs
    openuserjs(config['mirrors']['openuserjs'], 'full', 'lite', script_full)
    openuserjs(config['mirrors']['openuserjs'], 'lite', 'full', script_lite)

    return 0


if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
