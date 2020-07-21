const express = require("express");

const { c, cpp, node, python, java } = require("compile-run");
module.exports = {
  runCode,
};
async function runCode(code, langauge) {
  let resultPromite = {};
  switch (langauge) {
    case "text/x-python": {
      result = await python.runSource(code);
      break;
    }
    case "text/x-java": {
      result = await java.runSource(code);
      break;
    }
    case "text/javascript": {
      result = await node.runSource(code);
      break;
    }
    case "text/x-csrc": {
      result = await c.runSource(code);
      break;
    }
    case "text/x-c++src": {
      result = await cpp.runSource(code);
      break;
    }
  }
  if (result.stdout) return result.stdout;
  else return result.stderr;
}
