/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("medias", (table) => {
    table.uuid("id").primary();

    table.string("name").notNullable();
    table.string("type").notNullable().comment("video, audio, image");
    table.integer("size").notNullable().defaultTo(0);
    table.string("url");
    table.text("cover");
    table.text("source");

    table
      .string("chronicles_id")
      .notNullable()
      .references("id")
      .inTable("chronicles")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("medias");
};
