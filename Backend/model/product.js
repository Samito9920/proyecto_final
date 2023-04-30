const Decimal = require('decimal');
const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const product = new Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    cantidadProducto:{
        type: Number,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: false
    }
},{
        versionKey: false,
        timestamps: true
}) 


const productModel = model('product', product)

module.exports = productModel
