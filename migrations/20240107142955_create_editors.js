/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("editors", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
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
  return knex.schema.dropTable("editors");
};
