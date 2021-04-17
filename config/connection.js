let sql = require('mssql');
let config = 'Server=LAPTOP-UPNMOI7H;Database=NodeJS_Tuto;Trusted_Connection=True;';

let poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}