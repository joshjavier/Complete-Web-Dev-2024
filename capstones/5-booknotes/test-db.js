const pgp = require('pg-promise')()
const config = require('./util/config')

const { user, password, host, port, database, url } = config.pg
const connection = url ? url : `postgres://${user}:${password}@${host}:${port}/${database}`
const db = pgp(connection)

db.connect()
  .then(obj => {
    const serverVersion = obj.client.serverVersion
    console.log('Server version:', serverVersion)
    obj.done()
  })
  .catch(error => {
    console.log('ERROR:', error.message || error)
  })
