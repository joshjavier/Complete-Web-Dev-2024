require('dotenv').config()
const config = module.exports

config.express = {
  port: process.env.PORT || 3000,
}

config.pg = {
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRESS_PORT || '5432',
  database: process.env.POSTGRES_DB || 'booknotes',
  url: process.env.POSTGRES_URL,
}
