const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://milensamy11:${process.env.DB_PASSWORD}@cluster.syswxmv.mongodb.net/?retryWrites=true&w=majority`
console.log("------>",url)

mongoose.connect(url)
.then(()=>{
    console.log('Conexion a la base de datos completada')
})
.catch((error)=>{console.error(error);})