/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profiles', (table) => {
    table.increments('id').primary();
    
    // usersのuidを外部キーとして参照
    table.string('user_id')
      .notNullable()
      .unique()
      .references('uid')
      .inTable('users')
      .onDelete('CASCADE'); // users側削除時にprofilesでも削除
    
    table.string('displayname').notNullable();
    table.integer('frequency').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles');
};