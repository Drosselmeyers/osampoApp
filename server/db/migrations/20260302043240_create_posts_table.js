/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.bigIncrements("id").primary();
    table
      .string("user_id")
      .notNullable()
      .references("uid")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("image_url", 500);
    table.text("caption").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
