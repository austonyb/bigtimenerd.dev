const path = require('path')

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/index.html"))
    },

    login: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/login.html"))
    },

    register: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/register.html"))
    },

    admin: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/admin.html"))
    },

    articles: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/articles.html"))
    },

    //assets

    style: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/style.css"))
    },

    indexJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/index.js"))
    },

    loginJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/login.js"))
    },

    registerJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/register.js"))
    },

    adminJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/admin.js"))
    },

    articlesJs: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/articles.js"))
    },

    logoLarge: (req, res) => {
        res.sendFile(path.join(__dirname, "../../public/bigTimeNerdLogoLarge.png"))
    }
}