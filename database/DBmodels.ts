if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv');     // to laod development variables on development mode
  // if we are on developemnt, load the development variables
  dotenv.config();
}

import { Sequelize } from "sequelize";

const database = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST_NAME!,
  name: process.env.DB_NAME!,
};

console.log(database);

// __________set up sequelize connection (just like mongoose.connect())
const sequelize = new Sequelize(
  database.name, database.user, database.password,
  {
    host: database.host,
    dialect: 'postgres',
  }
);

import { initModels } from "./models/init-models";
const DBmodels = initModels(sequelize);
export default DBmodels;