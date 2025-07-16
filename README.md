# GraphQL Auth Demo (Apollo + Prisma + SQLite + TypeScript)

This is a simple GraphQL API with authentication using **Apollo Server**, **Prisma**, **SQLite**, and **TypeScript**. Users can register, login, and access protected data using a secure JWT-based authentication system.

## Features

- Signup with email and password
- Secure password hashing using `bcryptjs`
- Login and receive a signed JWT
- Protect routes using the Authorization header
- Access the currently logged-in user via `me` query
- Type-safe Prisma ORM with SQLite database
- Built with TypeScript


## Tech Stack

| Tool           | Role                         |
|----------------|------------------------------|
| Apollo Server  | GraphQL server               |
| Prisma         | Database ORM                 |
| SQLite         | Lightweight database         |
| TypeScript     | Static typing                |
| JWT (jsonwebtoken) | Authentication token     |
| bcryptjs       | Password hashing             |
| dotenv         | Environment config           |


## Project Structure

```

graphql-auth-demo/
├── prisma/              # Prisma schema
│   └── schema.prisma
├── src/
│   ├── index.ts         # Entry point / Apollo server
│   ├── context.ts       # JWT auth helpers & Prisma client
│   ├── schema.ts        # GraphQL typedefs (SDL)
│   └── resolvers.ts     # Signup/Login/Me resolvers
├── .env                 # Env vars (DB, secret)
├── package.json
└── dev.db               # SQLite database file

````

---

## ⚙Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/josh-Alhassan/graphql-auth-demo.git
cd graphql-auth-demo
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
APP_SECRET="supersecretkey"
```

### 4. Setup the database

```bash
npx prisma migrate dev --name init
```

---

## Run the API

```bash
npm run dev
```

Go to `http://localhost:4000/` to open the Apollo Sandbox and test.

---

## Authentication Flow

### 1. Signup

```graphql
mutation {
  signup(name: "Abel", email: "abel@test.com", password: "secret") {
    token
    user {
      id
      name
    }
  }
}
```

### 2. Login

```graphql
mutation {
  login(email: "abel@test.com", password: "secret") {
    token
    user {
      id
      name
    }
  }
}
```

### 3. Access Protected `me` Query

Set the token as a header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

Then query:

```graphql
query {
  me {
    id
    name
    email
  }
}
```

---

## 📌 Notes

* Passwords are securely hashed before saving.
* The JWT contains the user ID and is signed using your `APP_SECRET`.
* All authenticated queries use `context.userId` extracted from the token.

---

## 🙌 Credits

Inspired by the ["HowToGraphQL - TypeScript + Apollo Server"](https://www.howtographql.com/) backend track.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).
