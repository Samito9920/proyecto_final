const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const user = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    }
})

user.plugin(uniqueValidator, { message: 'Email already exists' });



user.pre('save', function (next) {
    console.log('-------antes---------')
    console.log(this.usuario, this.contrasena)
    console.log('-------------------')
    const hasdhedPassword = bcrypt.hashSync(this.contrasena, 12)
    console.log('-------despues--------')
    console.log(this.usuario, hasdhedPassword)
    console.log('-------------------')
    this.contrasena = hasdhedPassword
    next()
  })

const userModel = model('user', user)

module.exports = userModel
