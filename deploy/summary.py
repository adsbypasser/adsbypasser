#! /usr/bin/env python2


import re
import sys
import os

from markdown.blockprocessors import BlockProcessor
from markdown.preprocessors import Preprocessor
from markdown.preprocessors import ReferencePreprocessor
from markdown.extensions import Extension
from markdown import markdown


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
        self._cl = cl
        self._ss = ss
        self._tpl = tpl
        self._cl_head = None
        self._cl_body = None
        self._ss_group = None
        self._ss_count = None

    def setChangeLog(self, head, body):
        self._cl_head = head
        self._cl_body = body

    def setSites(self, group, count):
        self._ss_group = group
        self._ss_count = count

    def getResult(self):
        cle = _ChangeLogExtension(self)
        unused = markdown(self._cl, [cle])
        sse = _SitesExtension(self)
        unused = markdown(self._ss, [sse])

        cl = '{0}\n\n{1}'.format(self._cl_head, self._cl_body)
        summary = self._tpl.format(changelog=cl, sites=self._ss_group, count=self._ss_count)

        return summary


def _to_abs(relative_path):
    abs_path = os.path.abspath(__file__)
    csd = os.path.dirname(abs_path)
    path = os.path.join(csd, relative_path)
    return path


def make_summary(changelog_path, sites_path, template_path):
    fin = open(changelog_path, 'r')
    cl = fin.read()
    fin.close()

    fin = open(sites_path, 'r')
    ss = fin.read()
    fin.close()

    fin = open(template_path, 'r')
    tpl = fin.read()
    tpl = tpl.decode('utf-8')
    fin.close()

    pack = _Pack(cl, ss, tpl)
    return pack.getResult()


def main(args=None):
    if args is None:
        args = sys.argv

    changelog_path = _to_abs('../CHANGELOG.md')
    sites_path = _to_abs('../SITES.md')
    template_path = _to_abs('./summary.template.md')
    summary = make_summary(changelog_path, sites_path, template_path)
    summary_path = _to_abs('../dest/summary.md')
    with open(summary_path, 'w') as fout:
        fout.write(summary.encode('utf-8'))

    return 0


if __name__ == '__main__':
    exit_code = main(sys.argv)
    sys.exit(exit_code)


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
