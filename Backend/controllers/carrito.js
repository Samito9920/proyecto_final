const carritoModel = require('../model/carritoCompra');

const getAllCarritos = async () => {
  return carritoModel.find({});
}

const createCarrito = async (body) => {
  const newCarrito = new carritoModel(body);
  newCarrito.save();
  return newCarrito;
}

const findById = async (_id) => {
  return carritoModel.findById(_id).populate('productos.product');
}



const updateCarrito = async (_id, updateObject) => {
        const carrito = await carritoModel.findById(_id);
      
        if (updateObject.addProduct) {
          const { productoId, cantidad, precio } = updateObject.addProduct;
          const productoEncontrado = carrito.productos.find(
            (producto) => String(producto.product) === String(productoId)
          );
          if (productoEncontrado) {
            productoEncontrado.cantidad += cantidad;
          } else {
            carrito.productos.push({ product: productoId, cantidad: cantidad });
          }
          carrito.total += cantidad * precio;
        }
      
        if (updateObject.removeProduct) {
          const { productoId } = updateObject.removeProduct;
          const productoIndex = carrito.productos.findIndex(
            (producto) => String(producto.product) === String(productoId)
          );
          if (productoIndex >= 0) {
            const producto = carrito.productos[productoIndex];
            carrito.total -= producto.cantidad * producto.product.precio;
            carrito.productos.splice(productoIndex, 1);
          }
        }
      
        return carrito.save();     
}

const deleteCarrito = async (_id) => {
  return carritoModel.findOneAndDelete({ _id });
}

const getTotalCarrito = async () => {
  const carrito = await carritoModel.findById(carritoId).populate('productos.product');
  const productos = carrito.productos;
  let total = 0;

  for (let i = 0; i < productos.length; i++) {
    const precio = productos[i].product.precio;
    const cantidad = productos[i].cantidad;
    total += precio * cantidad;
  }

  return total;
};

const agregarProductoCarrito = async (carritoId, productoId, cantidad, precio) => {
    const carrito = await carritoModel.findById(carritoId);
  
    // Verificar si el producto ya está en el carrito
    const productoEncontrado = carrito.productos.find(
      (producto) => String(producto.product) === String(productoId)
    );
  
    // Si el producto ya está en el carrito, actualizar la cantidad
    if (productoEncontrado) {
      productoEncontrado.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.productos.push({ product: productoId, cantidad: cantidad });
    }
  
    // Actualizar el total del carrito
    carrito.total += cantidad * precio;
  
    await carrito.save();
    return carrito;
  };
  
  const getCarritoByUsuarioId = async (usuarioId) => {
    return carritoModel.findOne({ usuario: usuarioId }).populate('productos.product');
  }

  const eliminarProductoCarrito = async (carritoId, productoId) => {
    const carrito = await carritoModel.findById(carritoId);
    
    // Buscar el producto en el carrito
    const productoIndex = carrito.productos.findIndex(
      (producto) => String(producto.product) === String(productoId)
    );
    
    // Si el producto no está en el carrito, lanzar un error
    if (productoIndex === -1) {
      throw new Error('El producto no está en el carrito');
    }
    
    // Remover el producto del carrito y actualizar el total
    const cantidad = carrito.productos[productoIndex].cantidad;
    carrito.total -= cantidad * carrito.productos[productoIndex].product.precio;
    carrito.productos.splice(productoIndex, 1);
    
    await carrito.save();
    return carrito;
  };

  
module.exports = {
  getAllCarritos,
  createCarrito,
  updateCarrito,
  deleteCarrito,
  getTotalCarrito,
  agregarProductoCarrito,
  getCarritoByUsuarioId,
  eliminarProductoCarrito,
  findById
}
