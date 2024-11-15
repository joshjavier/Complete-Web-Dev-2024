const db = require('./util/db')

db.connect()
  .then(obj => {
    const serverVersion = obj.client.serverVersion
    console.log('Server version:', serverVersion)
    obj.done()
  })
  .catch(error => {
    console.log('ERROR:', error.message || error)
  })
