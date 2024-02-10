/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("broadcasts_history", (table) => {
    table.uuid("id").primary();
    table.string("user_id").notNullable();
    table
      .string("broadcast_id")
      .notNullable()
      .references("id")
      .inTable("broadcasts")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("broadcasts_history");
};
