import re
import sys

from markdown.blockprocessors import BlockProcessor
from markdown.preprocessors import Preprocessor
from markdown.preprocessors import ReferencePreprocessor
from markdown.extensions import Extension
from markdown import markdown

from util import to_abs_path


_CHANGELOG_PATH = to_abs_path('../../CHANGELOG.md')
_SITES_PATH = to_abs_path('../../SITES.md')
_TEMPLATE_PATH = to_abs_path('./summary.template.md')

_MESSAGE = {
    'both': '',
    'full': 'If you do not need image-hosting site support, please see [Lite version]({url}).',
    'lite': 'Lite version does not support image-hosting sites. If you want full-featured version, please see [here]({url}).',
}


class _ChangeLogProcessor(BlockProcessor):

    def __init__(self, parser, pack):
        BlockProcessor.__init__(self, parser)

        self._pack = pack
        self._first = True

    def test(self, parent, block):
        return self._first

    def run(self, parent, blocks):
        h = blocks[0]
        b = blocks[1]
        self._pack.setChangeLog(h, b)
        self._first = False


class _ChangeLogExtension(Extension):

    def __init__(self, pack):
        super(_ChangeLogExtension, self).__init__()

        self._pack = pack

    def extendMarkdown(self, md, md_globals):
        clp = _ChangeLogProcessor(md.parser, self._pack)
        md.parser.blockprocessors.add('changelog', clp, '>empty')


class _SitesProcessor(BlockProcessor):

    def __init__(self, parser, pack):
        BlockProcessor.__init__(self, parser)

        self._pack = pack
        self._first = True

    def test(self, parent, block):
        return self._first

    def run(self, parent, blocks):
        a = blocks[0]
        a = a.splitlines()
        c = []
        d = 0
        for b in a:
            if b == '* else':
                pass
            elif b[0] == '*':
                c.append(b)
            else:
                d = d + 1
        c = '\n'.join(c)
        self._pack.setSites(c, d)
        self._first = False


class _SitesExtension(Extension):

    def __init__(self, pack):
        super(_SitesExtension, self).__init__()

        self._pack = pack

    def extendMarkdown(self, md, md_globals):
        ssp = _SitesProcessor(md.parser, self._pack)
        md.parser.blockprocessors.add('sites', ssp, '>empty')


class _Pack(object):

    def __init__(self, cl, ss, tpl):
        self._cl_head = None
        self._cl_body = None
        self._ss_group = None
        self._ss_count = None
        self._tpl = tpl

        cle = _ChangeLogExtension(self)
        unused = markdown(cl, [cle])

        sse = _SitesExtension(self)
        unused = markdown(ss, [sse])

        self._cl = '{0}\n\n{1}'.format(self._cl_head, self._cl_body)

    def setChangeLog(self, head, body):
        self._cl_head = head
        self._cl_body = body

    def setSites(self, group, count):
        self._ss_group = group
        self._ss_count = count

    def getResult(self, edition, url):
        args = {
            'changelog': self._cl,
            'sites': self._ss_group,
            'count': self._ss_count,
            'edition': _MESSAGE[edition].format(url),
        }
        summary = self._tpl.format(**args)
        return summary


def make_summary():
    fin = open(_CHANGELOG_PATH, 'r')
    cl = fin.read()
    fin.close()

    fin = open(_SITES_PATH, 'r')
    ss = fin.read()
    fin.close()

    fin = open(_TEMPLATE_PATH, 'r')
    tpl = fin.read()
    tpl = tpl.decode('utf-8')
    fin.close()

    pack = _Pack(cl, ss, tpl)
    return pack


def main(args=None):
    if args is None:
        args = sys.argv

    summary = make_summary()
    result = summary.getResult('both', '')
    summary_path = to_abs_path('../../dest/summary.md')
    with open(summary_path, 'w') as fout:
        fout.write(result.encode('utf-8'))

    return 0


if __name__ == '__main__':
    exit_code = main(sys.argv)
    sys.exit(exit_code)


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
