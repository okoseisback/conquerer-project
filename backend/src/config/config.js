require('dotenv').config();

const environment = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT_DEV,
  }
};
module.exports = environment;
