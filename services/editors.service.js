const { knex } = require('./db.service.js')
const { v4: uuidv4 } = require('uuid')

const tableName = 'editors'

module.exports = {
  async getEditorsByBroacastId(broadcast_id) {
    try {
      return await knex(tableName)
        .where({ broadcast_id })
        .join('broadcasts', 'broadcasts.id', '=', 'editors.broadcast_id')
        .select('editors.name', 'editors.id')
    } catch (err) {
      console.error('Erreur lors de la récupération du broadcast:', err)
      throw err
    }
  }
}
