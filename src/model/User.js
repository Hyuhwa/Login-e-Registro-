import pool from "../config/db.js"

export const createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at
  `
  const values = [username, email, password]
  const result = await pool.query(query, values)
  return result.rows[0]
}

export const getUserByUsername = async (username) => {
  const query = `
    SELECT * FROM users WHERE username = $1
  `
  const result = await pool.query(query, [username])
  return result.rows[0]
}

export const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = $1
  `
  const result = await pool.query(query, [email])
  return result.rows[0]
}