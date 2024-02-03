const { knex } = require('./db.service.js')

const tableName = 'medias'

module.exports = {
  async createMedia({ editor, medias }) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) {
      return null
    }

    await knex(tableName).insert(medias)
  },
  async getMedia(mediaId, broadcast_id) {
    return await knex(tableName)
      .join('chronicles', 'chronicles.id', '=', 'medias.chronicle_id')
      .join('broadcasts', 'broadcasts.id', '=', 'chronicles.broadcast_id')
      .where({ 'medias.id': mediaId, 'broadcasts.id': broadcast_id })
      .select('medias.*')
      .first()
  }
}
