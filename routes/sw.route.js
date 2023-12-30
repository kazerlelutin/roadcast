const fs = require("fs").promises;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  method: "GET",
  path: "/sw.js",
  handler: async (req, h) => h.file("front/dist/index.html"),
};
