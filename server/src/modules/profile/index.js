const { createProfileRepository } = require("./profile.repository");
const { createProfileService } = require("./profile.service");
const { createProfileController } = require("./profile.controller");

function initProfile(knex) {
  const repository = createProfileRepository(knex);
  const service = createProfileService(repository);
  const controller = createProfileController(service, repository);

  return controller;
}

module.exports = { initProfile };