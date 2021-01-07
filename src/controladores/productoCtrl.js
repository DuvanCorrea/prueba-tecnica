const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM PRODUCTOS"
const GETONE = "SELECT * FROM PRODUCTOS WHERE (id_producto=?)"
const POST = "INSERT INTO PRODUCTOS (nombre_prodcuto, stok, categorias_id_categoria) VALUES (?,?,?)"
const DELETE = "DELETE FROM PRODUCTOS WHERE (id_producto=?)"
const UPDATE = "UPDATE PRODUCTOS SET nombre_prodcuto=?, stok=?, categorias_id_categoria=? WHERE (id_producto=?)"

// controlador de productos
// -----------------------
const productoCtrl = {

    // metodo para traer todas los productos de la base de datos
    // ---------------------------------------------------------
    getAll: (req, res) => {
        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETALL, (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        res.send(rows)
                    }
                })
            }
        })
    },

    // metodo para traer un producto
    // ----------------------------------------------------------
    getOne: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_producto } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETONE, [id_producto], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        if (rows.length <= 0) {
                            res.status(404)
                            res.send({ respuesta: "producto no encontrado", descripcion: "no se encontro el producto en la base de datos" })
                        } else {
                            res.send(rows)
                        }
                    }
                })
            }
        })
    },

    // metodo para guardar productos en la base de datos
    // --------------------------------------------------
    post: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { nombre_prodcuto, stok, categorias_id_categoria } = req.body

        // se guarda la categoria
        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(POST, [nombre_prodcuto, stok, categorias_id_categoria], (err, rows) => {

                    if (err) {

                        // este error quiere decir que no existe la categoria que envian de back
                        if (err.errno === 1452) {
                            res.send({ respuesta: "error", descripcion: "no existe la categoria seleccionada" })
                        } else {
                            res.status(500)
                            res.send({ respuesta: "error", descripcion: "error al ingresar informacion a la bd" })
                        }

                    } else {
                        // Se envia producto agregado con su correspondiente id
                        // --------------------------------------------------------
                        res.send({ id_producto: rows.insertId, nombre_prodcuto, stok, categorias_id_categoria })
                    }
                })
            }
        })
    },

    // metodo para eliminar los productos de la base de datos
    // ------------------------------------------------------
    delete: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_producto } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(DELETE, [id_producto], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al eliminar informacion a la bd" })
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "eliminado", descripcion: "El producto ha sido eliminada" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "El producto no fue encontrada" })
                        }
                    }
                })
            }
        })
    },

    // metodo para actualizar los productos de la base de datos
    // --------------------------------------------------------
    put: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_producto, nombre_prodcuto, stok, categorias_id_categoria } = req.body

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(UPDATE, [nombre_prodcuto, stok, categorias_id_categoria, id_producto], (err, rows) => {
                    if (err) {

                        // este error quiere decir que no existe la categoria que envian de back
                        if (err.errno === 1452) {
                            res.send({ respuesta: "error", descripcion: "no existe la categoria seleccionada" })
                        } else {
                            res.status(500)
                            res.send({ respuesta: "error", descripcion: "error al actualizar informacion en la bd" })
                        }

                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "actualizado", descripcion: "El producto ha sido actualizado" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "El producto no fue encontrado" })
                        }
                    }
                })
            }
        })
    }
}

module.exports = productoCtrl