const express = require("express");
const app = express()

// exportacion de las rutas
// ------------------------
const productoRutas = require("./rutas/producto.routes")

// configuraciones del servidor
// ----------------------------
app.set("port", 3000)

// middlewares
// -----------
app.use(express.json()) // para convertir texto plano en formato json

// agregar rutas al servidor
// -------------------------
app.use("/api", productoRutas)

// iniciando servidor
// ------------------
app.listen(app.get("port"), () => {
    console.log("Ejecutando servidor en el puerto ", app.get("port"))
})