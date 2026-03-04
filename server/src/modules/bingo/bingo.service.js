function createBingoService(repository) {
  const getAllBingoPanel = async () => {
    return await repository.getAllBingoPanel();
  };
  const patchBingoStatus = async (bingoId) => {
    return await repository.patchBingoStatus(bingoId);
  };
  const resetBingoStatus = async () => {
    return await repository.resetBingoStatus();
  };

  return { getAllBingoPanel, patchBingoStatus, resetBingoStatus };
}
createBingoService();
module.exports = { createBingoService };
