module.exports = {
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: "back/public",
        index: false,
      },
    },
  }
  