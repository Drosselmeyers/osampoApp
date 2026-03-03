function createSmallBingoRepository(knex, table = "small_bingo") {
  const getAllSmallBingoPanel = async () => {
    return await knex(table).select("*").orderBy("small_bingo_id", "asc");
  };
  const patchSmallBingoStatus = async (SmallBingoId) => {
    return await knex(table)
      .where("small_bingo_id", SmallBingoId)
      .update({ status: true })
      .returning("*");
  };

  const resetSmallBingoStatus = async () => {
    await knex(table).select("*").update({ status: false });
  };

  return {
    getAllSmallBingoPanel,
    patchSmallBingoStatus,
    resetSmallBingoStatus,
  };
}
module.exports = { createSmallBingoRepository };
