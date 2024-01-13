module.exports = {
  method: 'GET',
  path: '/bc/{id}',
  handler: (req, h) => {
    req.server.publish('/bc/' + req.params.id, {
      id: req.params.id,
      status: 'complete'
    })
    return h.response('Hello World!').code(200)
  }
}
