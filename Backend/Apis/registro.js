const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const userService = require('../services/user');


const UserService = new userService(userModel)


router.post('/usuariosnuevos', async (req, res) => {
    try{
         const body = req.body
  const user = await UserService.create(body)
  res.status(201).send(user)
    } catch(err){
        console.error(err)
    }
 

});

module.exports = router