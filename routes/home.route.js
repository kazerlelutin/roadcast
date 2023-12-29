module.exports = {
    method: "GET",
    path: "/{any*}",
    handler: (_req, h) => {
        return h.file("front/dist/index.html")
      }
  }
  