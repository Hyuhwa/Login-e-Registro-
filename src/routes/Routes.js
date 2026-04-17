//Rota de Registro de usuario

import express from "express"
import Login from "../controller/LoginController.js"
import Register from "../controller/RegisterController.js"
const router = express.Router()

router.post("/", Login)
router.post("/register", Register)

export default router