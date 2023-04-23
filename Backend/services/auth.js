const bcrypt = require('bcrypt')
const { Error } = require('mongoose')

const authService = class{
    constructor(userService){ 
        this.UserService = userService
    }

    async login(usuario, contrasena){
        const user = await this.UserService.getByUsuario(usuario)
        if(!user){
            throw new Error(`Usuario ingresado es incorrecto o no existe, ingrese de nuevo`)
        } else if (await bcrypt.compare(contrasena, user.contrasena || !user)){
            return user.toObject();
        } else {
            throw new Error('Usuario no Autorizado')
        }
    }
}

module.exports = authService