const { knex } = require("./db.service.js");
const { v4: uuidv4 } = require("uuid");

const tableName = "chronicles";

module.exports = {
  async createChronicle({ editor, position }) {
    const broadcast = await knex("broadcasts").where({ editor }).first();

    if (!broadcast) {
      return null;
    }

    const chronicleId = uuidv4();

    await knex(tableName).insert({
      id: chronicleId,
      broadcast_id: broadcast.id,
      position,
    });

    await knex(tableName)
      .where("broadcast_id", broadcast.id)
      .andWhere("position", ">=", position)
      .andWhere("id", "!=", chronicleId)
      .increment("position", 1);

    // Retourne la chronique nouvellement créée, avec un tri par position pour toutes les chroniques
    return await knex(tableName)
      .where({ broadcast_id: broadcast.id })
      .orderBy("position")
      .select('*');
  },
  async updateChronicle(id, editor, payload) {
    const broadcast = await knex("broadcasts").where({ editor }).first();

    if (!broadcast) return null;

    await knex(tableName)
      .where({ id, broadcast_id: broadcast.id })
      .update(payload);
  },
};
