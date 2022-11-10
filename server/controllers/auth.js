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


module.exports = {
    loginFunc: (req, res) => {
        
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
            res.status(200).send(dbRes[0])
            
        })
        .catch(err => console.log(err))
        })
            
            
      },

    }