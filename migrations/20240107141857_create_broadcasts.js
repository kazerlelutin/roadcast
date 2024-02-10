/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("broadcasts", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("editor").notNullable();
    table.string("reader").notNullable();
    table.datetime("started_at");
    table.datetime("finished_at");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("broadcasts");
};
