require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let authors

module.exports = {
    articleLoader: (req, res) => {
        
        sequelize.query(`
        SELECT id, first_name as first, last_name as last FROM users;
        `)
        .then((dbRes) => {
            authors = dbRes[0]
            console.log(authors)

            sequelize.query(`
            SELECT * FROM articles
            `)
            .then((dbRes) => {
                console.log("articles loaded from database.")
                console.log(dbRes[0])
                res.status(200).send(dbRes[0])
            })
            // .catch(console.log('Something went wrong loading articles from the database.'))
        })
        
    },

    authorName: (req, res) => {
        res.status(200).send(authors)
    },

    addComment: (req, res) => {
        sequelize.query(`
        
        `)
        
        res.status(200).send()
    },

    commentLoader: (req, res) => {
        sequelize.query(`
        SELECT * FROM chat
        `)
        .then((dbRes) => {
            messages = dbRes[0]
            console.log(messages)
            res.status(200).send(messages)
        })
    }

}