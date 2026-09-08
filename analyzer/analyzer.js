const parser = require("@babel/parser");

function analyzeCode(code) {
  const ast = parser.parse(code, {
    sourceType: "unambiguous",
  });

  let loopDepth = 0;
  let nestedLoops = 0;

  function visit(node) {
    if (!node || typeof node !== "object") {
      return;
    }

    if (node.type === "ForStatement") {
      loopDepth++;

      if (loopDepth > 1) {
        nestedLoops++;
      }

      visit(node.body);

      loopDepth--;
      return;
    }

    for (const key in node) {
      if (key === "loc") continue;

      const value = node[key];

      if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (value && typeof value === "object") {
        visit(value);
      }
    }
  }

  visit(ast);

  return {
    nestedLoops,
    message:
      nestedLoops > 0
        ? "⚠️ Nested loop detected. This may increase computational work."
        : "✅ No nested for-loops detected.",
  };
}

module.exports = { analyzeCode };