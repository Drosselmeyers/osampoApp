function createBingoRepository(knex, table = "bingo") {
  const allData = async () => {
    // const
  };

  // uidが存在しなければ作成（既存ユーザーは更新しない）
  const upsert = async (uid, email) => {
    const existing = await findByUid(uid);
    if (!existing) {
      await knex(table).insert({ uid, email });
    }
    return await findByUid(uid);
  };

  return { findByUid, upsert };
}

module.exports = { createBingoRepository };
