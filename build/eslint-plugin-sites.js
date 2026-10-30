/**
 * @param {string} a
 * @param {string} b
 */
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * @param {import("estree").Node | undefined} object
 * @param {string} name
 * @returns {import("estree").Expression | undefined}
 */
function property(object, name) {
  return object?.type === "ObjectExpression"
    ? object.properties.find(
        (item) =>
          item.type === "Property" &&
          !item.computed &&
          item.kind === "init" &&
          (item.key.type === "Identifier"
            ? item.key.name
            : item.key.type === "Literal"
              ? item.key.value
              : undefined) === name,
      )?.value
    : undefined;
}

/** @type {import("eslint").Rule.RuleModule} */
const sortDomains = {
  meta: {
    type: "suggestion",
    docs: { description: "Sort consecutive JSDoc domain tags alphabetically" },
    fixable: "code",
    schema: [],
    messages: { unsorted: "Sort @domain tags alphabetically." },
  },
  create(context) {
    return {
      Program() {
        const source = context.sourceCode;
        for (const comment of source.getAllComments()) {
          if (comment.type !== "Block" || !comment.value.startsWith("*")) {
            continue;
          }
          const original = source.getText(comment);
          const sorted = original.replace(
            /(?:^[\t ]*\*[\t ]+@domain[\t ]+\S+[^\r\n]*(?:\r?\n|$))+/gm,
            (run) => {
              const lines = run.match(/[^\r\n]+/g);
              const newline = run.includes("\r\n") ? "\r\n" : "\n";
              return (
                lines
                  .sort((a, b) =>
                    compare(
                      a.match(/@domain\s+(\S+)/)[1],
                      b.match(/@domain\s+(\S+)/)[1],
                    ),
                  )
                  .join(newline) + (run.endsWith("\n") ? newline : "")
              );
            },
          );
          if (sorted !== original) {
            context.report({
              loc: comment.loc,
              messageId: "unsorted",
              fix: (fixer) => fixer.replaceText(comment, sorted),
            });
          }
        }
      },
    };
  },
};

/** @type {import("eslint").Rule.RuleModule} */
const sortHosts = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Sort literal host and URL rule arrays in _.register",
    },
    fixable: "code",
    schema: [],
    messages: { unsorted: "Sort {{kind}} alphabetically." },
  },
  create(context) {
    const source = context.sourceCode;
    /**
     * @param {import("estree").Expression | undefined} array
     * @param {boolean} regex
     */
    function check(array, regex) {
      if (
        array?.type !== "ArrayExpression" ||
        !array.elements.every(
          (element) =>
            element?.type === "Literal" &&
            (regex ? !!element.regex : typeof element.value === "string"),
        ) ||
        source.getCommentsInside(array).length > 0
      ) {
        return;
      }
      const key = (element) => (regex ? element.regex.pattern : element.value);
      const sorted = [...array.elements].sort((a, b) =>
        compare(key(a), key(b)),
      );
      if (sorted.every((element, index) => element === array.elements[index])) {
        return;
      }
      context.report({
        node: array,
        messageId: "unsorted",
        data: { kind: regex ? "host patterns" : "URL rules" },
        // Replace only elements, preserving whitespace and trailing commas.
        fix: (fixer) =>
          array.elements.map((element, index) =>
            fixer.replaceText(element, source.getText(sorted[index])),
          ),
      });
    }
    return {
      CallExpression(node) {
        if (
          node.callee.type !== "MemberExpression" ||
          node.callee.computed ||
          node.callee.object.type !== "Identifier" ||
          node.callee.object.name !== "_" ||
          node.callee.property.name !== "register"
        ) {
          return;
        }
        const rule = property(node.arguments[0], "rule");
        check(rule, false);
        check(property(rule, "host"), true);
      },
    };
  },
};

/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
  rules: {
    "sort-domains": sortDomains,
    "sort-hosts": sortHosts,
  },
};

export default plugin;
