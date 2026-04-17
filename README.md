# 📌 API REST de Login e Registro
API REST desenvolvida com **Node.js**, **Express** e **PostgreSQL**, com sistema de autenticação utilizando **JWT** e criptografia de senha com **bcrypt**.

---

## 🚀 Funcionalidades

- Cadastro de usuário  
- Login com autenticação JWT  
- Senhas criptografadas  
- Integração com PostgreSQL  
- Estrutura organizada (MVC)  

---

## 🛠️ Tecnologias

- Node.js  
- Express  
- PostgreSQL  
- pg (node-postgres)  
- bcryptjs  
- jsonwebtoken  

---

## 📁 Estrutura

```
src/
 ├── config/
 │    └── db.js
 ├── controller/
 │    ├── RegisterController.js
 │    └── LoginController.js
 ├── model/
 │    └── User.js
 ├── routes/
 │    └── Routes.js
 └── server.js
```

---

## ⚙️ Instalação

### Clone o repositório

```
git clone https://github.com/Hyuhwa/Login-e-Registro-.git
cd seu-repo
```

---

### Instale as dependências

```
npm install
```

---

## 🗄️ Banco de Dados

Crie o banco:

```
CREATE DATABASE seubanco;
```

---

Crie a tabela:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Executando o projeto

```
npm run dev
```

---

## 📡 Endpoints

### 📌 Registrar usuário

**POST** `/register`

```
{
  "username": "teste",
  "email": "teste@gmail.com",
  "password": "12345"
}
```

---

### 🔐 Login

**POST** `/`

```
{
  "username": "teste",
  "password": "12345"
}
```

---

## 🔑 Autenticação

Após o login, será retornado um token JWT.

Use nas requisições protegidas:

```
Authorization: Bearer SEU_TOKEN
```

---

## 🧠 Funcionamento

### Registro
- Valida os dados  
- Verifica duplicidade de username/email  
- Criptografa a senha  
- Salva no banco  

### Login
- Busca usuário pelo username  
- Compara senha com bcrypt  
- Gera token JWT  

---

## 🧪 Testes

Você pode testar utilizando:

- Insomnia  
- Postman  

---

## 📌 Comandos úteis

Listar usuários:

```
SELECT * FROM users;
```

Buscar usuário:

```
SELECT * FROM users WHERE username = 'teste';
```

---

## ⚠️ Boas práticas

- Senhas criptografadas  
- Queries seguras (SQL Injection protegido)  
- Separação de responsabilidades  

---

## 🚀 Melhorias futuras

- Middleware de autenticação  
- Rotas protegidas  
- Refresh Token  

---

## 👨‍💻 Autor

Desenvolvido por ThiagoGA 🚀  

---

## ⭐

Se gostou do projeto, deixe uma estrela ⭐
