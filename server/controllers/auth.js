const bcrypt = require('bcrypt')
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

const adminList = ['Auston', 'Janalie', 'Cameron']


module.exports = {
    loginFunc: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const {email, password} = req.body
      
      sequelize.query(`
        SELECT * FROM users
        WHERE users.email = '${email}';
      `)
      .then((dbRes) => {
        console.log(dbRes)

        const userData = dbRes
        let {first_name, last_name, email, account_open_date} = userData[0][0]
      

        if (userData === undefined) {
          res.status(200).send({success: false, message: 'bad email or password'})
        } else {
          bcrypt.compare(password, userData[0][0].password, (error, success) => {
            if (!error) {
              if (success) {
                res.status(200).send({
                  success: true,
                  message: "success",
                  firstName: first_name,
                  lastName: last_name,
                  emailAddress: email,
                  accountCreatedAt: account_open_date
                })
              } else {
                res.status(200).send({success: false, message: 'bad password'})
              }
            } else {
              console.log('bcrypt had an error comparing passwords: ')
              console.log(error)
              res.status(500).send({success: false, message: "backend error"})
            }
          })
         }
        })
      },
  
  
      
      registerFunc: (req, res) => {
         let {firstName, lastName, email, password} = req.body
         console.log(req.body)
        //  console.log(`user registered: ${firstName}, ${lastName}, ${email}`)
         const saltRounds = 10
          
  
        bcrypt.hash(password, saltRounds, (err, hashPass) => {
          sequelize.query(`
          INSERT INTO users (first_name, last_name, email, password, account_open_date)
          VALUES ('${firstName}', '${lastName}', '${email}', '${hashPass}', current_timestamp);
          `)
          .then(dbRes => {
            res.status(200).send({
              success: true
            })
            
        })
        .catch(err => console.log(err))
        })
            
            
      },

      isAdmin: (req, res) => {
        let { name } = req.body
        console.log(name)
        if (name === 'Janalie' || 'Auston'){
          res.status(200).send({
            success: true
          })
        }
      }

    }