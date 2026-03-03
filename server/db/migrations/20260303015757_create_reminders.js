/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('reminders', (table) => {
    table.increments('id').primary();
    
    // usersのuidを外部キーとして参照
    table.string('user_id')
      .notNullable()
      .unique()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE'); // users側削除時にremindersでも削除
    
    // リマインド設定時刻を取得
    table.timestamp('base_time').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_active').defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('reminders');
};
