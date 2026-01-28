const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

sequelize.sync().then(() =>
  app.listen(process.env.PORT, () =>
    console.log('API SQLite rodando na porta ' + process.env.PORT)
  )
);