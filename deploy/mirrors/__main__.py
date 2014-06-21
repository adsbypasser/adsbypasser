from __future__ import unicode_literals
from __future__ import absolute_import

import sys
import os
import json


def to_abs_path(relative_path):
    csd = os.path.dirname(__file__)
    path = os.path.join(csd, relative_path)
    abs_path = os.path.abspath(path)
    return path


def read_config():
    path = to_abs_path('../../.deploy.json')
    with open(path, 'r') as fin:
        data = json.load(fin)
    return data


def read_file(path):
    path = to_abs_path(path)
    with open(path, 'r') as fin:
        data = fin.read().decode('utf-8')
    return data


def main(args=None):
    if args is None:
        args = sys.argv

    config = read_config()
    summary = read_file('../../dest/summary.md')
    script = read_file('../../dest/nopicads.user.js')

    from mirrors.greasyfork import exec_ as greasyfork
    greasyfork(config['greasyfork'], summary, script)

    from mirrors.monkeyguts import exec_ as monkeyguts
    monkeyguts(config['monkeyguts'], summary, script)

    from mirrors.openuserjs import exec_ as openuserjs
    openuserjs(config['openuserjs'], summary, script)

    return 0


if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
