const express = require('express');

function createProfilesRouter(profilesController) {
  const router = express.Router();

  router.get('/profiles/:user_id', profilesController.getProfile);
  router.post('/profiles', profilesController.createProfile);
  router.put('/profiles/:user_id', profilesController.updateProfile);
  router.delete('/profiles/:user_id', profilesController.deleteProfile);

  return router;
}

module.exports = { createProfilesRouter };