/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  /* tableに関して改善が必要。 */
  return knex.schema.createTable("small_bingo", (table) => {
    table.increments("small_bingo_id").primary();
    // table.text('user_id');
    table.text("title");
    table.text("src");
    table.boolean("status");
    // table.foreign('user_id').references('uid').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("small_bingo");
};
