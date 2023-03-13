const Pool = require('pg-pool');

require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB 

console.table([DATABASE_URL,POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_DB])


console.log('DB URL', DATABASE_URL)
// const DATABASE_URL = "dpg-cg35td1mbg5fch37gv60-a.frankfurt-postgres.render.com"
// const POSTGRES_USER = "admin"
// const POSTGRES_PASSWORD = "0d3KVezX2JHsQfUFtYUhJyDlBVg3gMaA"
// const POSTGRES_DB = "mdsn_movies_prod"



const config = {
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: DATABASE_URL,
  port: 5432,
  database: POSTGRES_DB,
  ssl: true
};

const pool = new Pool(config);

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id SERIAL PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`


pool.connect().then((client) => {
  return client
    .query(CREATE_TIMES_TABLE_SQL)
    .then((res) => {
      client.release()
      console.log(res.rows[0])
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})

module.exports = pool;
