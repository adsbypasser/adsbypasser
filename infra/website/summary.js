export {
  getSummaryForGitHubPages,
};

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import marked  from 'marked';


const CHANGELOG_PATH = toAbsolutePath('../../CHANGELOG.md');
const SITES_PATH = toAbsolutePath('../../SITES.md');
const TEMPLATE_PATH = toAbsolutePath('./summary.template.md');
const MESSAGE_GHPAGES = `**Lite edition** removes image-hosting site support from **Full edition**.
If you prefer to use other userscripts to deal with image-hosting sites, you can use the Lite edition.
`;
const MESSAGE_FULL = 'If you do not need image-hosting site support, please see [Lite edition]({url}).';
const MESSAGE_LITE = 'Lite edition does not support image-hosting sites. If you want full-featured edition, please see [here]({url}).';


function getSummaryForGitHubPages () {
  const changeLog = parseChangeLog();
  const sites = parseSites();

  let data = fs.readFileSync(TEMPLATE_PATH, {
    encoding: 'utf-8',
  });
  data = _.template(data);
  data = data({
    edition_note: MESSAGE_GHPAGES,
    changelog: changeLog,
    site_groups: sites.groups,
    site_count: sites.sites,
  });

  data = marked(data);
  return data;
}


function toAbsolutePath (path_) {
  return path.resolve(__dirname, path_);
}


// Find the latest version's change log.
function parseChangeLog () {
  let data = fs.readFileSync(CHANGELOG_PATH, {
    encoding: 'utf-8',
  });
  data = marked.lexer(data);
  const parser = new ChangeLogParser();
  for (let node of data) {
    parser.feed(node);
  }
  return parser.block_text;
}


class ChangeLogParser {

  constructor () {
    this._first_block_ended = false;
    this._block_text = '';
    this._list_level = 0;
  }

  feed (node) {
    if (this._first_block_ended) {
      return;
    }

    if (node.type === 'heading') {
      const m = '#'.repeat(node.depth);
      this._block_text += `${m} ${node.text}\n\n`;
    } else if (node.type === 'list_start') {
      this._list_level += 1;
    } else if (node.type === 'list_end') {
      this._list_level -= 1;
      if (this._list_level === 0) {
        this._first_block_ended = true;
      }
    } else if (node.type === 'text') {
      const i = ' '.repeat(4 * (this._list_level - 1));
      this._block_text += `${i}* ${node.text}\n`;
    }
  }

  get block_text () {
    return this._block_text;
  }

}


// Find sites groups, and counts total supported sites.
function parseSites () {
  let data = fs.readFileSync(SITES_PATH, {
    encoding: 'utf-8',
  });
  data = marked.lexer(data);
  const parser = new SitesParser();
  for (let node of data) {
    parser.feed(node);
  }
  return {
    groups: parser.groups,
    sites: parser.sites,
  };
}


class SitesParser {

  constructor () {
    this._list_level = 0;
    this._groups = '';
    this._sites = 0;
  }

  feed (node) {
    if (node.type === 'list_start') {
      this._list_level += 1;
    } else if (node.type === 'list_end') {
      this._list_level -= 1;
    } else if (node.type === 'text') {
      if (this._list_level === 1) {
        if (node.text !== 'else') {
          this._groups += `* ${node.text}\n`;
        }
      } else if (this._list_level === 2) {
        this._sites += 1;
      }
    }
  }

  get groups () {
    return this._groups;
  }

  get sites () {
    return this._sites;
  }

}
