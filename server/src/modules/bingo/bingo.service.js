function createBingoService(repository) {
  const getAllBingoPanel = async () => {
    return await repository.getAllBingoPanel();
  };
  const patchBingoStatus = async () => {
    return await repository.patchBingoStatus();
  };
  const resetBingoStatus = async () => {
    return await repository.resetBingoStatus();
  };

  return { getAllBingoPanel, patchBingoStatus, resetBingoStatus };
}
createBingoService();
module.exports = { createBingoService };
