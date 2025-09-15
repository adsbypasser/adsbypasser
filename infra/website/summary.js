import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import _ from "lodash";
import { marked } from "marked";
import { extractDomainsFromJSDoc } from "./jsdoc-domains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = toAbsolutePath("../../CHANGELOG.md");
const TEMPLATE_PATH = toAbsolutePath("./summary.template.md");
const MESSAGE_GHPAGES = `**Lite edition** removes image-hosting site support from **Full edition**.
If you prefer to use other userscripts to deal with image-hosting sites, you can use the Lite edition.
`;

function getSummaryForGitHubPages() {
  const changeLog = parseChangeLog();
  const domains = extractDomainsFromJSDoc();

  // Format domains array as markdown list
  const siteList = domains.map((domain) => `* ${domain}`).join("\n");

  let data = fs.readFileSync(TEMPLATE_PATH, {
    encoding: "utf-8",
  });
  data = _.template(data);
  data = data({
    edition_note: MESSAGE_GHPAGES,
    changelog: changeLog,
    site_list: siteList,
  });

  data = marked(data);
  return data;
}

function toAbsolutePath(path_) {
  return path.resolve(__dirname, path_);
}

// Find the latest version's change log.
function parseChangeLog() {
  let data = fs.readFileSync(CHANGELOG_PATH, {
    encoding: "utf-8",
  });
  data = marked.lexer(data);
  const parser = new ChangeLogParser();
  for (let node of data) {
    parser.feed(node);
  }
  return parser.block_text;
}

class ChangeLogParser {
  constructor() {
    this._first_block_ended = false;
    this._block_text = "";
    this._list_level = 0;
  }

  feed(node) {
    if (this._first_block_ended) {
      return;
    }

    if (node.type === "heading") {
      const m = "#".repeat(node.depth);
      this._block_text += `${m} ${node.text}\n\n`;
    } else if (node.type === "list") {
      this._list_level += 1;
      if (node.items && node.items.length > 0) {
        for (const item of node.items) {
          if (item.type === "list_item") {
            const i = " ".repeat(4 * (this._list_level - 1));
            this._block_text += `${i}* ${item.text}\n`;
          }
        }
        this._first_block_ended = true;
      }
    }
  }

  get block_text() {
    return this._block_text;
  }
}

export { getSummaryForGitHubPages };
