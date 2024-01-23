const { knex } = require('./db.service.js')
const { v4: uuidv4 } = require('uuid')

const tableName = 'medias'

module.exports = {
  async createMedia({ editor, medias }) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) {
      return null
    }

    await knex(tableName).insert(medias)
  }
}
