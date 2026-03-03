const { createTimerRepository } = require("./timer.repository");
const { createTimerService } = require("./timer.service");
const { createTimerController } = require("./timer.controller");

function initTimer(knex) {
  const repository = createTimerRepository(knex);
  const service = createTimerService(repository);
  const controller = createTimerController(service);
  return controller;
}

module.exports = { initTimer };
