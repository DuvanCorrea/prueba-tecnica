const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM PRODUCTOS"

// controlador de productos
// ------------------------
const productoCtrl = {

    // metodo para traer todos los productos de la base de datos
    // ---------------------------------------------------------
    getAll: (req, res) => {
        db.getConnection((err, conn) => {
            if (err) {
                console.log(err)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETALL, (err, rows) => {
                    if (err) {
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        res.send(rows)
                    }
                })
            }
        })
    },

    // metodo para traer todos los productos de la base de datos
    // ---------------------------------------------------------
    post: (req, res) => {

        // extraer la información de la petición
        // -------------------------------------
        db.getConnection((err, conn) => {
            if (err) {
                console.log(err)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETALL, (err, rows) => {
                    if (err) {
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        res.send(rows)
                    }
                })
            }
        })
    },
}

module.exports = productoCtrl