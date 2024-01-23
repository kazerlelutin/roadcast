module.exports = {
  method: 'GET',
  path: '/uploads/{param*}',
  handler: {
    directory: {
      path: 'uploads',
      index: false
    }
  }
}
