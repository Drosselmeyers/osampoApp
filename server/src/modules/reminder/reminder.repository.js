function createReminderRepository(knex, table = "reminders") {
  
  // リマインダー取得
  const findByUserId = async (user_id) => {
    return await knex(table).where({ user_id }).first();
  };
  
  // リマインダー設定/更新（upsert）
  const upsert = async (user_id) => {
    const existing = await findByUserId(user_id);
    
    if (existing) {
      // 既存のリマインダーがあれば base_time を更新
      const now = new Date();
      await knex(table)
        .where({ user_id })
        .update({ base_time: now });
    } else {
      // なければ新規作成（base_time は DB のデフォルト値）
      await knex(table).insert({ user_id });
    }
    
    return await findByUserId(user_id);
  };

  // リマインダー削除
  const deleteReminder = async (user_id) => {
    return await knex(table).where({ user_id }).delete();
  };
  
  return {
    findByUserId,
    upsert,
    deleteReminder,
  };
}

module.exports = { createReminderRepository };