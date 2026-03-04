const { createSmallBingoRepository } = require("./smallBingo.repository");
const { createSmallBingoService } = require("./smallBingo.service");
const { createSmallBingoController } = require("./smallBingo.controller");

function initSmallBingo(knex) {
  const repository = createSmallBingoRepository(knex);
  const service = createSmallBingoService(repository);
  const controller = createSmallBingoController(service);
  return controller;
}

module.exports = { initSmallBingo };
