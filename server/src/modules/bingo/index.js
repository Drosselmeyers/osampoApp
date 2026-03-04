const { createBingoRepository } = require("./bingo.repository");
const { createBingoService } = require("./bingo.service");
const { createBingoController } = require("./bingo.controller");

function initBingo(knex) {
  const repository = createBingoRepository(knex);
  const service = createBingoService(repository);
  const controller = createBingoController(service);
  return controller;
}

module.exports = { initBingo };
