/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bingo', (table) => {
    table.increments('bingo_id').primary();
    table.integer('user_id');
    table.text('title').unique().notNullable();
    table.text('src').unique().notNullable();
    table.boolean('status');
    table.foreign('user_id').references('uid').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('bingo');
};
