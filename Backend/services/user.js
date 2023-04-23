const userService = class {
    constructor(userModel){
        this.Model = userModel
    }

    getByUsuario(usuario){
        return this.Model.findOne({ usuario })
    }

    async create(userData){
        const newUser = this.Model(userData)
        await newUser.save()
        return newUser
    }

    async find() {
        try {
          return await this.Model.find()
        } catch (err) {
          throw new Error(`Error al obtener los usuarios: ${err.message}`)
        }
      }
}

module.exports= userService