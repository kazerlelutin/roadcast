module.exports = {
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'front/dist/assets',
      index: false
    }
  }
}
