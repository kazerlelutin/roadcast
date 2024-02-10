const Joi = require('joi')
const { getXInfo } = require('../services/get-x--info')
const { getBroadcastByEditor } = require('../services/broadcasts.service')
const {
  createMedia,
  getMedia,
  deleteMedia
} = require('../services/medias.service')
const path = require('node:path')
const fs = require('node:fs')
const { v4: uuidv4 } = require('uuid')

module.exports = [
  {
    /**
     * create a media
     **/
    method: 'POST',
    path: '/api/media/chronicle/{chronicleId}',
    options: {
      payload: {
        parse: true,
        output: 'stream',
        multipart: true,
        maxBytes: 300 * 1024 * 1024 //300 mb
      }
    },
    handler: async (req, h) => {
      const { editor, userId } = getXInfo(req)

      const data = req.payload
      const chronicle_id = req.params.chronicleId
      const files = Array.isArray(data.files) ? data.files : [data.files]

      const filesToSave = []

      const dir = path.join(__dirname, '../uploads')
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)

      for (const file of files) {
        const extension = path.extname(file.hapi.filename)
        const id = uuidv4()
        const uuidName = id + extension
        const destination = path.join(dir, uuidName)
        const fileStream = fs.createWriteStream(destination)

        await new Promise((resolve, reject) => {
          file.pipe(fileStream)

          file.on('end', resolve)
          file.on('error', reject)
          filesToSave.push({
            id,
            name: file.hapi.filename.split('.')[0],
            size: file._data.length,
            type: file.hapi.headers['content-type'],
            url: `/uploads/${uuidName}`,
            chronicle_id,
            source: '',
            cover: ''
          })
        })
      }
      try {
        await createMedia({ editor, medias: filesToSave })

        const broadcast = await getBroadcastByEditor(editor)

        req.server.publish('/broadcast/editor/' + editor, {
          userId,
          type: 'addMedia',
          context: 'chronicle',
          id: chronicle_id
        })

        return h.response(broadcast.chronicles).type('json').code(201)
      } catch (e) {
        console.log('create media: ', e)
        return h
          .response({
            error: 'Error creating media'
          })
          .code(500)
          .type('json')
      }
    }
  },
  {
    /**
     * create a media
     **/
    method: 'GET',
    path: '/api/media/slider/{mediaId}',
    handler: async (req, h) => {
      //TODO if reader,send editor ? or other endpoint
      const { editor, userId } = getXInfo(req)

      const mediaId = req.params.mediaId

      const broadcast = await getBroadcastByEditor(editor)

      //TODO send just good media keys
      const media = await getMedia(mediaId, broadcast.id)
      req.server.publish('/slider/' + broadcast.reader, {
        userId,
        type: 'castMedia',
        context: 'chronicle',
        media
      })

      return h.response({ msg: 'send' }).type('json').code(201)
    }
  },
  {
    /**
     * Delete a chronicle
     **/
    method: 'DELETE',
    path: '/api/media/{id}',
    handler: async (req, h) => {
      const { id } = req.params
      const { editor, userId } = getXInfo(req)

      try {
        await deleteMedia(id, editor)
        req.server.publish('/broadcast/editor/' + editor, {
          userId,
          type: 'delete',
          context: 'media',
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
