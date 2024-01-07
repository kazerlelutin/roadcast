const { createKey } = require("./create-key.js");
const { knex } = require("./db.service.js");
const { v4: uuidv4 } = require("uuid");

const tableName = "broadcasts";

module.exports = {
  async createBroadcast(broadcast) {
    const id = uuidv4();

    try {
      await knex(tableName).insert({
        id,
        ...broadcast,
        editor: createKey(),
        reader: createKey(),
      });
      return id;
    } catch (err) {
      console.error("Erreur lors de l’enregistrement de l’utilisateur:", err);
      throw err;
    }
  },
  async getBroadcastById(id) {
    try {
      return await knex(tableName).where({ id }).first();
    } catch (err) {
      console.error("Erreur lors de la récupération du broadcast:", err);
      throw err;
    }
  },
  async getBroadcastByEditor(editor) {
    try {
      return await knex(tableName).where({ editor }).first();
    } catch (err) {
      console.error("Erreur lors de la récupération du broadcast:", err);
      throw err;
    }
  },
  async getBroadcastByReader(reader) {
    try {
      return await knex(tableName).where({ reader }).first();
    } catch (err) {
      console.error("Erreur lors de la récupération du broadcast:", err);
      throw err;
    }
  },
};
