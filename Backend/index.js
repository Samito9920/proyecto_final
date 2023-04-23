const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()


const apirRouter = require('./Apis')

app.use(cors())
require('./db/mongodb')
app.use(express.json())
app.use('/ecommerce', apirRouter)

// Configuración de rutas
app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});



