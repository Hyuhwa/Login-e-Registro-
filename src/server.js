import express from "express"
import dotenv from "dotenv"
import pool from "./config/db.js"
import router from "./routes/Routes.js"


const app = express()
app.use(express.json())
app.use(router)

dotenv.config()

app.get("/", async (req, res) =>{
    const result = await pool.query(`SELECT NOW()`)
    res.json(result.rows[0])
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})