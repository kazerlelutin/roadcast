/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chronicles", (table) => {
    table.uuid("id").primary();
    table.string("title");
    table.text("content");
    table.text("source");
    table
      .string("status")
      .notNullable()
      .defaultTo("draft")
      .comment("draft, published, archived");
    table.integer("position").notNullable().defaultTo(0);

    table.string("editor_id").notNullable().references("id").inTable("editors");
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
  return knex.schema.dropTable("chronicles");
};
