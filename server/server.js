const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())


const { home, login, style, indexJs, loginJs, logoLarge } = require("./pgCtrl")

//page navigation:

app.get("/", home)

app.get("/login", login)

//assets

app.get("/style", style)

app.get("/indexjs", indexJs)

app.get("/loginjs", loginJs)

//logo

app.get("/large-logo", logoLarge)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))