const { knex } = require("./db.service.js");
const { v4: uuidv4 } = require("uuid");

const tableName = "broadcasts_history";

module.exports = {
  async createBroadcastHistory(broadcast_id, user_id) {
    const id = uuidv4();
    try {
      await knex(tableName).insert({
        id,
        broadcast_id,
        user_id,
      });
      return id;
    } catch (err) {
      console.error("Erreur lors de l’enregistrement de l’utilisateur:", err);
      throw err;
    }
  },
  async getBroadcastsHistoryByUserId(user_id) {
    try {
      return await knex(tableName)
        .where({ user_id })
        .join(
          "broadcasts",
          "broadcasts.id",
          "=",
          "broadcasts_history.broadcast_id"
        )
        .select(
          "broadcasts.name",
          "broadcasts.editor"
        ).orderBy('broadcasts_history.created_at', 'desc').limit(25)
    } catch (err) {
      console.error("Erreur lors de la récupération du broadcast:", err);
      throw err;
    }
  },
};
