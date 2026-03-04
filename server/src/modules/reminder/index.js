const { createReminderRepository } = require("./reminder.repository");
const { createReminderService } = require("./reminder.service");
const { createReminderController } = require("./reminder.controller");
const { createProfileRepository } = require("../profile/profile.repository");

function initReminder(knex) {
  const reminderRepository = createReminderRepository(knex);
  const profileRepository = createProfileRepository(knex);
  const reminderService = createReminderService(reminderRepository, profileRepository);
  const reminderController = createReminderController(reminderService);
  
  return reminderController;
}

module.exports = { initReminder };