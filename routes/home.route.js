const fs = require('fs').promises
const jsdom = require('jsdom')
const { getBroadcastByEditor } = require('../services/broadcasts.service')
const { JSDOM } = jsdom

module.exports = {
  method: 'GET',
  path: '/{any*}',
  handler: async (req, h) => {
    const content = await fs.readFile(
      __dirname + '/../front/dist/index.html',
      'utf8'
    )
    const dom = new JSDOM(content)
    const document = dom.window.document

    const metas = document.querySelectorAll('meta')
    const title = document.querySelector('title')
    title.textContent = ' | ROADCAST'
    const params = req.params.any.split('/')

    if (
      params[0] === 'bc' &&
      params.length === 3 &&
      (params[1] === 'editor' || params[1] === 'reader')
    ) {
      const editor = params[1] === 'editor' ? params[2] : null
      const reader = params[1] === 'reader' ? params[2] : null
      const broadcast = editor
        ? await getBroadcastByEditor(editor)
        : await getBroadcastByReader(reader)

      if (!broadcast) {
        return h.response(dom.serialize()).type('text/html')
      }

      //TODO on cherche le broadcast juste pour injecter les meta
      title.textContent = broadcast.name + ' | ROADCAST'
    }
    return h.response(dom.serialize()).type('text/html')
  }
}
