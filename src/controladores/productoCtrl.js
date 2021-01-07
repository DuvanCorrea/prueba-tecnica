const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM PRODUCTOS"
const GETCATEGORIAS = "SELECT * FROM CATEGORIAS"
const POST = "INSER INTO PRODCUTOS (nombre_prodcuto, stok, categorias_id_categoria) VALUES (?,?,?)"

// controlador de productos
// ------------------------
const productoCtrl = {

    // metodo para traer todos los productos de la base de datos
    // ---------------------------------------------------------
    getAll: (req, res) => {
        db.getConnection((err, conn) => {
            if (err) {
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
        const { nombre_prodcuto, stok, id_categoria } = req.body

        console.log({ nombre_prodcuto, stok, id_categoria })

        // primero se valida que el id de la categoria exista
        // --------------------------------------------------
        db.getConnection((err, conn) => {
            if (err) {
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETCATEGORIAS, (err, rows) => {
                    if (err) {
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        console.log(rows)
                    }
                })
            }
        })

        // db.getConnection((err, conn) => {
        //     if (err) {
        //         res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
        //     } else {
        //         conn.query(GETALL, (err, rows) => {
        //             if (err) {
        //                 res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
        //             } else {
        //                 res.send(rows)
        //             }
        //         })
        //     }
        // })
    },
}

module.exports = productoCtrl