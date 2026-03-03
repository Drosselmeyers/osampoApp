function createBingoRepository(knex, table = "bingo") {
  const getAllBingoPanel = async () => {
    return await knex(table).select("*").orderBy("bingo_id", "asc");
  };
  const patchBingoStatus = async (bingoId) => {
    return await knex(table)
      .where("bingo_id", bingoId)
      .update({ status: true })
      .returning("*");
  };

  const resetBingoStatus = async () => {
    await knex(table).select("*").update({ status: false });
    // return await knex(table).select("*").orderBy("bingo_id", "asc");
  };

  return { getAllBingoPanel, patchBingoStatus, resetBingoStatus };
}
module.exports = { createBingoRepository };
