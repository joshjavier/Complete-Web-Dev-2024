const pgp = require('pg-promise')()
const config = require('../util/config')

const { url, user, password, host, port, database } = config.pg
const cn = url ? url : `postgres://${user}:${password}@${host}:${port}/${database}`
const db = pgp(cn)

module.exports = db
