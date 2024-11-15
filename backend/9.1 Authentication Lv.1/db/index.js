import pg from 'pg'
const { Pool } = pg

const connectionString = 'postgres://postgres@localhost:5432/secrets'
const pool = new Pool({ connectionString })

export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}
