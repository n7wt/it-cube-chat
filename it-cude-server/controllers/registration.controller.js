const database = require('../database') // getPoolDB
const sendMail = require('./nodemailer.controller');
require('dotenv').config()

class UserRegistration{
    // async getAllUsers(req,res){
    //     const getUsers = await database.query(
    //         'SELECT * FROM users'
    //     );
    //     res.json(getUsers);
    // }
    async regUser(req,res){
        const {user_login,user_mail,user_password,password_from_email} = req.body;
      

        sendMail.sendTestMail(
            user_login,
            user_mail,
            password_from_email
        );

       
        res.json({
            user_login,
            user_mail,
            user_password,
            password_from_email
        })
    }

}   

module.exports = new UserRegistration;