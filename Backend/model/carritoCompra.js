const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const uniqueValidator = require('mongoose-unique-validator')

const carrito = new Schema({
   fecha: {
    type: String,
    default: Date.now,
    required: true
    },
    productos: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, ref:'product'
            },
            cantidad: Number
        }
    ],
    usuario: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, ref: 'user'
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }

   
})


const carritoModel = model('carrito', carrito)

module.exports = carritoModel
