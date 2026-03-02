const express = require('express');
const knex = require('./knex');
const path = require('path');

const { initUser } = require('./modules/user/index');
const { createUserRouter } = require('./routes/user');

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use('/', express.static(path.join(__dirname, '../../client/dist')));

  const userController = initUser(knex);
  app.use('/api', createUserRouter(userController));

  app.get('/api/bingo', async (req, res) => {
    const allBingoList = await knex('bingo')
      .select('*')
      .orderBy('bingo_id', 'asc');
    return res.send(allBingoList);
  });

  app.patch('/api/bingo/:bingoId', async (req, res) => {
    const bingoId = req.params.bingoId;
    const patchData = await knex('bingo')
      .where('bingo_id', bingoId)
      .update({ status: true })
      .returning('*');
    return res.send(patchData[0]);
  });
  app.patch('/api/bingo', async (_, res) => {
    const resetStatus = await knex('bingo')
      .select('*')
      .update({ status: false })
      .orderBy('bingo_id', 'asc')
      .returning('*');
    return res.send(resetStatus);
  });
  return app;
}

module.exports = { buildApp };
