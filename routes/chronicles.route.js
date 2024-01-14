const Joi = require('joi')
const {
  createChronicle,
  updateChronicle,
  getChronicle,
  deleteChronicle
} = require('../services/chronicles.service')
const { getXInfo } = require('../services/get-x--info')
const { getBroadcastByEditor } = require('../services/broadcasts.service')

module.exports = [
  {
    /**
     * update a chronicle
     **/
    method: 'GET',
    path: '/api/chronicle/{id}',
    handler: async (req, h) => {
      const { id } = req.params
      const { editor } = getXInfo(req)
      try {
        const chronicle = await getChronicle(id, editor)
        return h.response(chronicle).type('json').code(200)
      } catch (e) {
        console.log('update chronicle: ', e)
        return h
          .response({
            error: 'Error updating chronicle'
          })
          .code(500)
          .type('json')
      }
    }
  },

  {
    /**
     * create a chronicle
     **/
    method: 'POST',
    path: '/api/chronicle',
    handler: async (req, h) => {
      const { editor } = getXInfo(req)

      const schema = Joi.object({
        position: Joi.number().required()
      })

      try {
        const { value } = schema.validate(JSON.parse(req.payload))

        await createChronicle({
          editor,
          ...value
        })

        const broadcast = await getBroadcastByEditor(editor)

        return h.response(broadcast.chronicles).type('json').code(201)
      } catch (e) {
        console.log('create chronicle: ', e)
        return h
          .response({
            error: 'Error creating chronicle'
          })
          .code(500)
          .type('json')
      }
      //TODO brancher les SOCKETS
    }
  },
  {
    /**
     * update a chronicle
     **/
    method: 'PUT',
    path: '/api/chronicle/{id}',
    handler: async (req, h) => {
      const { id } = req.params
      const { editor, userId } = getXInfo(req)
      const schema = Joi.object({
        position: Joi.number(),
        content: Joi.string(),
        title: Joi.string(),
        source: Joi.string()
      })

      try {
        const { value } = schema.validate(JSON.parse(req.payload))

        await updateChronicle(id, editor, { ...value })
        req.server.publish('/broadcast/editor/' + editor, {
          userId,
          type: 'update',
          context: 'chronicle',
          id
        })
        return h.response({ message: 'ok' }).type('json').code(200)
      } catch (e) {
        console.log('update chronicle: ', e)
        return h
          .response({
            error: 'Error updating chronicle'
          })
          .code(500)
          .type('json')
      }
    }
  },
  {
    /**
     * Delete a chronicle
     **/
    method: 'DELETE',
    path: '/api/chronicle/{id}',
    handler: async (req, h) => {
      const { id } = req.params
      const { editor, userId } = getXInfo(req)

      try {
        await deleteChronicle(id, editor)
        req.server.publish('/broadcast/editor/' + editor, {
          userId,
          type: 'delete',
          context: 'chronicle',
          id
        })
        return h.response({ message: 'ok' }).type('json').code(200)
      } catch (e) {
        console.log('update chronicle: ', e)
        return h
          .response({
            error: 'Error updating chronicle'
          })
          .code(500)
          .type('json')
      }
    }
  }
]
