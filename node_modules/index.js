const express = require('express')
const pedidosRoutes = require('./routes/pedidos.routes')

const app = express()
app.use(express.json())

app.use('/pedidos', pedidosRoutes)

app.listen(3000, () => {
  console.log('servidor corriendo en puerto 3000')
})
