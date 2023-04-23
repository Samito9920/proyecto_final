const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
require('dotenv').config()

const userModel = require('../model/user')
const userService = require('../services/user');
const authService = require('../services/auth')

const UserService = new userService(userModel)
const AuthService = new authService(UserService)
const JWT_SECRET = process.env.JWT_SECRET



//login
router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try{
        const user = await AuthService.login(usuario,contrasena)
      
        const payload ={
            user: {
                id: user._id
            }
        }

        const token = jwt.sign({
            payload,
            exp:  Math.floor(Date.now() / 1000) + (60 * 60)  
        },JWT_SECRET
    );
 
        res.send({
            _id: user._id,
            token: token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
        });
    }
});


module.exports = router