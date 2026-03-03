function createReminderRepository(knex, table = "reminders") {
  
  // user_idで検索
  const findByUserId = async (user_id) => {
    return await knex(table).where({ user_id }).first();
  };
  
  // リマインダー作成
  const createReminder = async (user_id) => {
    await knex(table).insert({ user_id });
    return await findByUserId(user_id);
  };

  // リマインダー削除
  const deleteReminder = async (user_id) => {
    return await knex(table).where({ user_id }).delete();
  };
  
  return {
    findByUserId,
    createReminder,
    deleteReminder,
  };
}

module.exports = { createReminderRepository };