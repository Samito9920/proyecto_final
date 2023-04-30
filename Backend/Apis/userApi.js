const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const userService = require('../services/user');
const carritoController = require('../controllers/carrito')
const {getCarritoByUsuarioId} = carritoController

const UserService = new userService(userModel)

router.get('/me', (req, res) =>{
    const sessionUser = req.body
    console.log(sessionUser)
    console.log(req.user)
    if(!sessionUser){
        return res.status(403).send({
            message: 'Incorrecto'
        })
    }

    res.send({
        username: sessionUser.username,
        user: sessionUser.usuario
    })
})


router.get('/usuarios', async (req, res) => {
    try {
        const users = await UserService.find()
        res.send(users);
        console.log(users)
    } catch (err) {
        console.error(err) 
        res.status(500).send(err);
    }
});



//Obtener los Usuarior por el usuario
router.get('/usuarios/:usuario', async(req, res) => {
    try{
        const usuario = req.params.usuario
        const user = await UserService.getByUsuario(usuario)
        res.status(200).send(user);
    } catch (error){
        console.error(error)
        res.status(500).send(error)
    }
})


router.post('/logout', (req, res) => {
    // Eliminar el token almacenado en el lado del cliente
    res.clearCookie('token')
  
    // Enviar una respuesta al cliente para indicar que se ha cerrado la sesión
    res.send('Sesión cerrada exitosamente')
  })
  
  router.get('/:userId', async (req, res) => {
    try {
      const carrito = await carritoController.getCarritoByUserId(req.params.userId);
      if (!carrito || carrito.productos.length === 0) {
        return res.status(404).json({ message: 'Carrito no encontrado o vacío' });
      }
      return res.json(carrito);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  });



module.exports = router