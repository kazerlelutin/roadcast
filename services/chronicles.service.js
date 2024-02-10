const { knex } = require('./db.service.js')
const { v4: uuidv4 } = require('uuid')

const tableName = 'chronicles'

module.exports = {
  async createChronicle({ editor, position }) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) {
      return null
    }

    const chronicleId = uuidv4()

    await knex(tableName).insert({
      id: chronicleId,
      broadcast_id: broadcast.id,
      position
    })

    await knex(tableName)
      .where('broadcast_id', broadcast.id)
      .andWhere('position', '>=', position)
      .andWhere('id', '!=', chronicleId)
      .increment('position', 1)
    return chronicleId
  },
  async getChronicle(id, editor) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) return null

    //TODO appliquer les joins
    const chronicle = await knex(tableName)
      .where({ id, broadcast_id: broadcast.id })
      .first()

    return chronicle
  },
  async updateChronicle(id, editor, payload) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) return null

    await knex(tableName)
      .where({ id, broadcast_id: broadcast.id })
      .update(payload)
  },
  async updateChroniclePosition(id, editor, newPosition) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) return null

    const chronicle = await knex(tableName)
      .where({ id, broadcast_id: broadcast.id })
      .first()

    if (!chronicle) return null

    const oldPosition = chronicle.position

    // Cas où la nouvelle position est 0
    if (newPosition === 0) {
      // Incrémentez toutes les positions
      await knex(tableName)
        .where('broadcast_id', broadcast.id)
        .increment('position', 1)
    } else if (newPosition > oldPosition) {
      // Déplacer vers une position inférieure
      await knex(tableName)
        .where('broadcast_id', broadcast.id)
        .andWhere('position', '>', oldPosition)
        .andWhere('position', '<=', newPosition)
        .decrement('position', 1)
    } else if (newPosition < oldPosition) {
      // Déplacer vers une position supérieure
      await knex(tableName)
        .where('broadcast_id', broadcast.id)
        .andWhere('position', '<', oldPosition)
        .andWhere('position', '>=', newPosition)
        .increment('position', 1)
    }

    // Mise à jour de la position de la chronique actuelle
    await knex(tableName)
      .where({ id, broadcast_id: broadcast.id })
      .update({ position: newPosition })
  },
  async deleteChronicle(id, editor) {
    const broadcast = await knex('broadcasts').where({ editor }).first()

    if (!broadcast) return null

    const chronicle = await knex(tableName)
      .where({
        id,
        broadcast_id: broadcast.id
      })
      .first()

    if (!chronicle) return null

    const position = chronicle.position

    await knex(tableName).where({ id, broadcast_id: broadcast.id }).delete()

    await knex(tableName)
      .where('broadcast_id', broadcast.id)
      .andWhere('position', '>', position)
      .decrement('position', 1)
  }
}
