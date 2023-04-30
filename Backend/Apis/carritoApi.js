const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito');
const mongoose = require('mongoose');
const {
    getAllCarritos,
    createCarrito,
   eliminarProductoCarrito,
    deleteCarrito,
    agregarProductoCarrito,
    findById
} = carritoController

router.get('/carrito', async(req, res) => {
    const carrito = await getAllCarritos();
    res.send(carrito);
    res.status(200);
} )

router.post('/guardarCompra', async(req, res)=>{
    try{
        const newCarrito = await createCarrito(req.body);
        res.status(200);
        res.send(newCarrito)
    } catch (error){
        res.send(400);
        return res.send({
            error : error.message
        })
    }
})

router.put('/editarCarrito/:idCarrito/productos/:idProducto', async (req, res) => {
    const { idCarrito, idProducto } = req.params;
    const { cantidad, precio, operacion } = req.body;

    try {
        // Buscar el carrito por su identificador
        const carrito = await findById(idCarrito);

        // Si no se encontró el carrito, lanzar una excepción
        if (!carrito) {
            throw new Error('No se encontró el carrito');
        }

        const result = operacion === 'agregar'
            ? await agregarProductoCarrito(idCarrito, idProducto, cantidad, precio)
            : await eliminarProductoCarrito(idCarrito, idProducto);

        // Si no se encontró el producto, lanzar una excepción
        if (!result) {
            throw new Error('No se encontró el producto en el carrito');
        }

        // Si todo salió bien, retornar el carrito actualizado
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error al agregar o eliminar el producto del carrito' });
    }
});

  

  

router.delete('/eliminarCarrito/:id', async(res, req) =>{
    const {id} = req.params;
    try{
        const deletedCarrito = await deleteCarrito(id);
        if(!deletedCarrito){
            return res.status(404).send({ message: 'El carrito se enceuntra vacio' }); 
        }
        res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
    
})

router.get('/carritos/:id', async (req, res) => {
    try {
      const carrito = await findById(req.params.id);
  
      if (!carrito) {
        return res.status(404).json({ error: 'No se encontró el carrito' });
      }
  
      return res.json(carrito);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al buscar el carrito' });
    }
  });


module.exports = router;
