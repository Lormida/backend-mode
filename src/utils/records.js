const client = require('./mysqlPool.js')


const readRecords = () => 
  client
    .query('SELECT * FROM times ORDER BY created_at DESC')
    .then(res => res.rows)
    .catch(e => console.error(e.stack))

const insertRecord = (time) =>
  client
    .query( 'INSERT INTO times (time) VALUES ($1) RETURNING *', [time] )
    .then(res => {
      return res.rows[0]
    })
    .catch(e => console.error(e.stack))
  

const deleteRecord = (id) =>
  client
    .query( 'DELETE FROM times WHERE id=$1 RETURNING *', [id] )
    .then(res => {
      return res.rows[0]
    })
    .catch(e => console.error(e.stack))
    
  exports.readRecords = readRecords;
  exports.insertRecord = insertRecord;
  exports.deleteRecord = deleteRecord;
  