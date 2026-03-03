/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("timer", (table) => {
    table.increments("timer_id").primary();
    table.string("user_id").unique();
    /* TIME: HH:MM:SS 形式（例: 14:30:00 */
    table.time("time");
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
