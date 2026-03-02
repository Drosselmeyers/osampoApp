function createProfileRepository(knex, table = "profiles") {
  // user_idで検索
  const findByUserId = async (user_id) => {
    return await knex(table).where({ user_id }).first();
  };

  // プロフィール作成
  const createProfile = async (user_id, displayname, frequency) => {
    await knex(table).insert({ user_id, displayname, frequency });
    return await findByUserId(user_id);
  };

  // プロフィール更新
  const updateProfile = async (user_id, displayname, frequency) => {
    await knex(table)
      .where({ user_id })
      .update({ 
        displayname, 
        frequency,
        updated_at: knex.fn.now()
      });
    return await findByUserId(user_id);
  };

  // プロフィール削除
  const deleteProfile = async (user_id) => {
    return await knex(table).where({ user_id }).delete();
  };

  return { 
    findByUserId, 
    createProfile, 
    updateProfile, 
    deleteProfile 
  };
}

module.exports = { createProfileRepository };