module.exports = {
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: 'front/public',
      index: false
    }
  }
}
