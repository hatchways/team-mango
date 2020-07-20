const express = require("express");

const { c, cpp, node, python, java } = require("compile-run");
module.exports = {
  runCode,
};
async function runCode(code, langauge) {
  let resultPromite = {};
  switch (langauge) {
    case "text/x-python": {
      console.log("execute python");
      result = await python.runSource(code);
      break;
    }
    case "text/x-java": {
      console.log("execute Java");
      result = await java.runSource(code);
      break;
    }
    case "text/javascript": {
      console.log("execute Javascript");
      result = await node.runSource(code);
      break;
    }
    case "text/x-csrc": {
      console.log("execute c");
      result = await c.runSource(code);
      break;
    }
    case "text/x-c++src": {
      console.log("execute c++");
      result = await cpp.runSource(code);
      break;
    }
  }
  if (result.stdout) return result.stdout;
  else return result.stderr;
  // .then((result) => {
  //   return result.stdout;
  // })
  // .catch((err) => {
  //   return result.err;
  // });
}
