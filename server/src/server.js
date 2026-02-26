const express = require("express");
const knex = require("./knex");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../../client/dist')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});