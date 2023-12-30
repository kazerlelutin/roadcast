const fs = require('fs').promises;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
    method: "GET",
    path: "/{any*}",
    handler: async (req, h) =>  {
 
        const content = await fs.readFile(__dirname + "/../front/dist/index.html", "utf8");
        const dom = new JSDOM(content);
        const document = dom.window.document;

        const metas = document.querySelectorAll("meta");
        const title = document.querySelector("title");
        title.textContent = " | ROADCAST";
        const params = req.params.any.split("/");

        if (params[0] === "broadcast") {
            //TODO on cherche le broadcast juste pour injecter les meta
            title.textContent = params[1] + " | ROADCAST";
        }
        return h.response(dom.serialize()).type('text/html');
    }
   
  }
  