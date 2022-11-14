const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())

const { loginFunc, registerFunc } = require("./controllers/auth.js")

const { home, login, style, indexJs, loginJs, logoLarge, register, registerJs, admin, adminJs, articles, articlesJs} = require("./controllers/pgCtrl")

const { articleLoader, addComment, deleteComment, articleSubmit } = require("./controllers/contentApi.js")

//user management / Login and Register API

try {
    app.post(`/user/login`, loginFunc)
} catch {
    console.log('login function crashed.')
}

try {
    app.post(`/user/register`, registerFunc)
} catch {
    console.log('register function crashed.')
}


//page navigation:

app.get("/", home)

app.get("/login", login)

app.get("/register", register)

app.get("/admin", admin)

app.get("/articles", articles)

//assets

app.get("/style", style)

app.get("/indexjs", indexJs)

app.get("/loginjs", loginJs)

app.get("/registerjs", registerJs)

app.get("/adminjs", adminJs)

app.get("/articlesjs", articlesJs)


//logo

app.get("/large-logo", logoLarge)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))


