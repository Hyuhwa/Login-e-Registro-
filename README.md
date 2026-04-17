# 🔐 API REST — Login e Registro

> API de autenticação completa com **Node.js**, **Express** e **PostgreSQL**, utilizando **JWT** para geração de tokens e **bcryptjs** para criptografia de senhas.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints](#-endpoints)
- [Autenticação JWT](#-autenticação-jwt)
- [Testes](#-testes)
- [Boas Práticas](#-boas-práticas)
- [Melhorias Futuras](#-melhorias-futuras)
- [Autor](#-autor)

---

## 📌 Sobre

Este projeto é uma API REST focada em autenticação de usuários. Ele permite o **registro** de novos usuários e o **login** com geração de token JWT, seguindo a arquitetura MVC e boas práticas de segurança como hash de senhas e proteção contra SQL Injection.

---

## 🚀 Funcionalidades

- ✅ Cadastro de usuário com validação de duplicidade
- ✅ Login com geração de token JWT
- ✅ Senhas criptografadas com bcryptjs
- ✅ Integração com banco de dados PostgreSQL
- ✅ Arquitetura MVC organizada
- ✅ Suporte a variáveis de ambiente via `.env`

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | — | Runtime JavaScript |
| Express | ^5.2.1 | Framework HTTP |
| PostgreSQL | — | Banco de dados relacional |
| pg (node-postgres) | ^8.20.0 | Driver do PostgreSQL |
| bcryptjs | ^3.0.3 | Criptografia de senhas |
| jsonwebtoken | ^9.0.3 | Geração e validação de JWT |
| dotenv | ^17.3.1 | Variáveis de ambiente |
| nodemon | ^3.1.14 | Reinicialização automática (dev) |

---

## 📁 Estrutura do Projeto

```
Login-e-Registro/
├── src/
│   ├── config/
│   │   └── db.js               # Conexão com o PostgreSQL
│   ├── controller/
│   │   ├── RegisterController.js  # Lógica de registro
│   │   └── LoginController.js     # Lógica de login
│   ├── model/
│   │   └── User.js             # Modelo/queries do usuário
│   ├── routes/
│   │   └── Routes.js           # Definição das rotas
│   └── server.js               # Ponto de entrada da aplicação
├── frontend/                   # Interface web (HTML/CSS/JS)
├── backend/
├── .env                        # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/Hyuhwa/Login-e-Registro-.git
cd Login-e-Registro-
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seubanco
JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

## 🗄️ Configuração do Banco de Dados

### Crie o banco de dados

```sql
CREATE DATABASE seubanco;
```

### Crie a tabela de usuários

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Executando o Projeto

**Modo desenvolvimento** (com hot-reload via nodemon):

```bash
npm run dev
```

**Modo produção:**

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

---

## 📡 Endpoints

### POST `/register` — Registrar usuário

Cria um novo usuário no sistema.

**Body (JSON):**
```json
{
  "username": "thiago",
  "email": "thiago@email.com",
  "password": "minhasenha123"
}
```

**Resposta de sucesso:**
```json
{
  "message": "Usuário cadastrado com sucesso!"
}
```

---

### POST `/` — Login

Autentica o usuário e retorna um token JWT.

**Body (JSON):**
```json
{
  "username": "thiago",
  "password": "minhasenha123"
}
```

**Resposta de sucesso:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔑 Autenticação JWT

Após o login bem-sucedido, um token JWT é retornado. Inclua-o no cabeçalho das requisições protegidas:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 🔄 Fluxo de Funcionamento

### Registro
1. Recebe `username`, `email` e `password`
2. Verifica se `username` ou `email` já existem no banco
3. Criptografa a senha com `bcryptjs`
4. Salva o novo usuário no PostgreSQL

### Login
1. Recebe `username` e `password`
2. Busca o usuário no banco pelo `username`
3. Compara a senha enviada com o hash armazenado via `bcrypt.compare`
4. Se válido, gera e retorna um token JWT assinado

---

## 🧪 Testes

Você pode testar os endpoints com as ferramentas:

- [Insomnia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (extensão do VS Code)

**Comandos úteis no banco para verificar dados:**

```sql
-- Listar todos os usuários
SELECT * FROM users;

-- Buscar usuário específico
SELECT * FROM users WHERE username = 'thiago';
```

---

## 🛡️ Boas Práticas Aplicadas

- 🔒 Senhas nunca armazenadas em texto puro (hash com bcryptjs)
- 🛡️ Queries parametrizadas (proteção contra SQL Injection)
- 🏗️ Separação de responsabilidades (arquitetura MVC)
- 🔑 Autenticação stateless com JWT
- 🌱 Configurações sensíveis via variáveis de ambiente

---

## 🔭 Melhorias Futuras

- [ ] Middleware de autenticação para rotas protegidas
- [ ] Rotas autenticadas (ex: `/profile`, `/dashboard`)
- [ ] Refresh Token para renovação de sessão
- [ ] Validação de dados com Zod ou Joi
- [ ] Logout com blacklist de tokens
- [ ] Paginação e filtros nas consultas

---

## 👨‍💻 Autor

Desenvolvido por **ThiagoGA** 🚀

[![GitHub](https://img.shields.io/badge/GitHub-Hyuhwa-181717?style=for-the-badge&logo=github)](https://github.com/Hyuhwa)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
