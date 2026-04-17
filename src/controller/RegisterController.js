import bcrypt from "bcryptjs"
import { createUser, getUserByUsername, getUserByEmail } from "../model/User.js"

const Registro = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" })
    }

    const userExists = await getUserByUsername(username)
    if (userExists) {
      return res.status(400).json({ message: "Username já existe" })
    }

    const emailExists = await getUserByEmail(email)
    if (emailExists) {
      return res.status(400).json({ message: "Email já cadastrado" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await createUser(username, email, passwordHash)

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno do servidor" })
  }
}

export default Registro