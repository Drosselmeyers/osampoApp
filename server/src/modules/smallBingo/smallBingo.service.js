function createSmallBingoService(repository) {
  const getAllSmallBingoPanel = async () => {
    return await repository.getAllSmallBingoPanel();
  };
  const patchSmallBingoStatus = async (smallBingoId) => {
    return await repository.patchSmallBingoStatus(smallBingoId);
  };
  const resetSmallBingoStatus = async () => {
    return await repository.resetSmallBingoStatus();
  };

  return {
    getAllSmallBingoPanel,
    patchSmallBingoStatus,
    resetSmallBingoStatus,
  };
}

module.exports = { createSmallBingoService };
