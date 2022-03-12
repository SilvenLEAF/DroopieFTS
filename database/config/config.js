if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv');     // to laod development variables on development mode
  // if we are on developemnt, load the development variables
  dotenv.config();
}

const database = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST_NAME,
  name: process.env.DB_NAME,
};

const DB_STRING = `postgres://${database.user}:${database.password}@${database.host}/${database.name}`

module.exports = {
  development: {
    url: DB_STRING,
    dialect: 'postgres',
  },
  test: {
    url: DB_STRING,
    dialect: 'postgres',
  },
  production: {
    url: DB_STRING,
    dialect: 'postgres',
  },
}