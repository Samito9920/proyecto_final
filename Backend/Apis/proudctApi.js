const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto');

const {
  getAllProducts,
  createProduct,
  updateProducto,
  deleteProducto,
  obtenerProductoNombre,
  obtenerCantidadProducto
} = producto;

router.get("/producto", async (req, res) =>{
    const productos = await getAllProducts();
    res.send(productos);
});

router.post("/agregarProducto", async (req, res) => {
    const body = req.body;
    try{
        const nuevoProducto = await createProduct(body);
        res.status(200);
        res.send(nuevoProducto);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            res.status(400); //Error por backend
            return res.send ({
                message: "Error al momento de guardar",
                reason: error.message,
            }) 
        }
        res.status(500);
        return res.send({
            error: err.message,
        });
    }
});

router.put("/editarProducto/:id", async (req, res) => {
    const { id } = req.params;
    const updateObject = req.body;
    try {
      const productoActualizado = await updateProducto(id, updateObject);
      if (!productoActualizado) {
        res.status(400);
        return res.send({
          message: "El producto no se ha encontrado"
        });
      }
      res.send(productoActualizado)
    } catch (error) {
      res.status(500);
      return res.send({
        error: error.message
      })
    }
  });

router.delete('/eliminarProducto/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await deleteProducto(id);
      if (!deletedProduct) {
        return res.status(404).send({ message: 'Producto no encontrado' });
      }
      res.send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

module.exports = router;
