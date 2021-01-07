const db = require("../database/db")

// quierys para peticiones a la base de datos
const GETALL = "SELECT * FROM PRODUCTOS"

// controlador de productos
const productoCtrl = {

    // metodo para traer todos los productos de la base de datos
    getAll: (req, res) => {
        db.getConnection((err, conn) => {
            if (err) {
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETALL, (err, rows) => {
                    if (err) {
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        console.log(rows)
                    }
                })
            }
        })
        console.log("get all productos")
    }
}

module.exports = productoCtrl