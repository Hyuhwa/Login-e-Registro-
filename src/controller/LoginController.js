import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { getUserByUsername } from "../model/User.js"

const Login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Preencha username e senha" })
    }

    const user = await getUserByUsername(username)

    if (!user) {
      return res.status(400).json({ message: "Usuário não existe" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: "Senha incorreta" })
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erro interno do servidor" })
  }
}

export default Login