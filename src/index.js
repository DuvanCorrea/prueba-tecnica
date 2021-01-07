const express = require("express");
const app = express()

// configuraciones del servidor
// ----------------------------
app.set("port", 3000)

// middlewares
// -----------
app.use(express.json()) // para convertir texto plano en formato json

// iniciando servidor
// ------------------
app.listen(app.get("port"), () => {
    console.log("Ejecutando servidor en el puerto ", app.get("port"))
})