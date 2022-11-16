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
        SELECT id, first_name as first, last_name as last FROM users
        ORDER BY id ASC;
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
        const { poster, message } = req.body

        sequelize.query(`
        INSERT INTO chat (poster, message, time)
        VALUES ('${poster}', '${message}', current_timestamp);
        `)
        
        res.status(200).send({
            success:true
        })
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
    },

    statsCounter: (req, res) => {
        let messageCount = 0
        let userCount = 0
        let articleCount = 0

        sequelize.query(`
        SELECT COUNT(chat_id)
        FROM chat
        `)
        .then((dbRes) => {
           messageCount = dbRes[0][0].count
           console.log(messageCount)

           sequelize.query(`
           SELECT COUNT(id)
           FROM articles;
           `)
           .then((dbRes) => {
                articleCount = dbRes[0][0].count

                sequelize.query(`
                SELECT COUNT(id)
                FROM users;
                `)
                .then((dbRes) => {
                    userCount = dbRes[0][0].count

                    res.status(200).send({
                        messageCount: messageCount,
                        userCount: userCount,
                        articleCount: articleCount
                    })
            })
           })
        })
    },

    articleSubmit: (req, res) => {
        const { authorID, content, publishDate, imageURL, title } = req.body

        sequelize.query(`
        INSERT INTO articles (author_id, content, publish_date, image, title)
        VALUES (${authorID}, '${content}', '${publishDate}', '${imageURL}', '${title}');
        `)
        .then((dbRes) => {
            res.status(200).send({
                success: true
            })
        })
        .catch(err => console.log(err + ' there was an error when a user submitted an article.'))
    },

    deleteArticle: (req, res) => {
        const { id } = req.body
        
        sequelize.query(`
        DELETE FROM articles
        WHERE id = '${i}'
        `)
        .then((dbRes) => {
            res.status(200).send({})
        })
    }

}