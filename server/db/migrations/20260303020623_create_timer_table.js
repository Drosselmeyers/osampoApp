/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("timer", (table) => {
    table.increments("timer_id").primary();
    table.string("user_id").unique();
    table.integer("time");
    table.foreign("user_id").references("uid").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("timer");
};
