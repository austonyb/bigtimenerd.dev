const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())

const { loginFunc, registerFunc, isAdmin } = require("./controllers/auth.js")

const { home, login, style, indexJs, loginJs, logoLarge, register, registerJs, admin, adminJs, articles, articlesJs} = require("./controllers/pgCtrl")

const { articleLoader, authorName, addComment, commentLoader, articleSubmit, commentCounter } = require("./controllers/contentApi.js")

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

try {
    app.post(`/user/admin`, isAdmin)
} catch {
    console.log('something is not working with the admin check func.')
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

//content API

app.get("/content", articleLoader)

app.get("/content/author", authorName)

app.get('/content/chat', commentLoader)

app.post('/content/chat', addComment)

app.get('/content/chat/count', commentCounter)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))


