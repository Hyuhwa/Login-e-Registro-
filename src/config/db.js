import {Pool} from 'pg'

const pool = new Pool({})

pool.on("connect", () => {
    console.log("Banco conectado com sucesso!")
})

pool.off("error", (err) => {
    console.log("Um erro aconteceu:", err.message)
})

export default pool;

//