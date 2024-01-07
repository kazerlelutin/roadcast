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
      const broadcasts = await knex(tableName).where({ user_id });
      return broadcasts[0];
    } catch (err) {
      console.error("Erreur lors de la récupération du broadcast:", err);
      throw err;
    }
  },
};
