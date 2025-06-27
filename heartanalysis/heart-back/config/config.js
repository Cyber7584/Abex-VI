require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "toor",
    database: process.env.DB_DATABASE_DEV || "postgres",
    host: process.env.DB_HOST_DEV || "db_dev",
    port: process.env.DB_PORT_DEV || 5432,
    dialect: "postgres",

    logging: console.log,
  },
  test: {
    username: process.env.DB_USERNAME_TEST || "postgres_test",
    password: process.env.DB_PASSWORD_TEST || "toor_test",
    database: process.env.DB_DATABASE_TEST || "postgres_test",
    host: process.env.DB_HOST_TEST || "db_dev",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "postgres",
    logging: false,
  }
};