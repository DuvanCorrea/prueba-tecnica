const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM PERSONAS"
const GETONE = "SELECT * FROM PERSONAS WHERE (id_persona=?)"

const DELETE = "DELETE FROM PERSONAS WHERE (id_persona=?)"
const UPDATE = "UPDATE PERSONAS SET nombre_completo=? WHERE (id_persona=?)"

const GET_ONE_PRODUCT = "SELECT * FROM PRODUCTOS WHERE (id_producto=?)"
const POST_VENTA = "INSERT INTO VENTAS (fecha, personas_id_persona) VALUES (?,?)"
const POST_PRODUCTOS_HAS_VENTAS = "INSERT INTO PRODUCTOS_HAS_VENTAS (productos_id_producto, ventas_id_venta, cantidad) VALUES (?,?,?)"
const UPDATE_PRODUCT = "UPDATE PRODUCTOS SET stok=stok-? WHERE (id_producto=?)"

// valiables
// ---------
const prodcutosNoEncontrados = []
const productosSinStok = []
let productosAux = []
let id_personaAux = null

// metodo para agregar los productos a la tabla productos_has_ventas
// en la base de datos, se utiliza de forma recursiva validando 
// producto por producto que si este disponible y además haya
// disponibilidad de la cantidad solicitada, en caso de que no se
// cumplan las condiciones se envia un mensaje de alerta y se cancela
// la operación
//-------------------------------------------------------------------
const validarProducto = (res, conn, e, i) => {

    conn.query(GET_ONE_PRODUCT, [e.id_producto], (err, rows) => {

        if (rows.length > 0) {
            if (rows[0].stok === 0) {
                productosSinStok.push({ id_producto: e.id_producto, detalle: "producto agotado" })
            } else if (rows[0].stok < e.cantidad_vendida) {
                productosSinStok.push({ id_producto: e.id_producto, detalle: "no hay las unidades necesarias" })
            }
        } else {
            prodcutosNoEncontrados.push({ id_producto: e.id_producto, detalle: "producto no encontrado" })
        }

        // validar si termino el ciclo
        // ---------------------------
        if (productosAux.length - 1 === i) {

            // se envia respuesta si hay alguna irregularidad
            // ----------------------------------------------
            if (productosSinStok.length !== 0 || prodcutosNoEncontrados.length !== 0) {
                res.send({ respuesta: "no se completo la venta", prodcutosNoEncontrados, productosSinStok })
            } else {

                // si todo esta bien, se procede a hacer la modificacion del
                // stok en la base de datos y generar registro de la venta
                // ---------------------------------------------------------

                // se genera el registro en la tabla ventas
                // ----------------------------------------
                conn.query(POST_VENTA, [new Date().toJSON(), id_personaAux], (err, row) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al registrar venta" })
                    }

                    // se genera registro de la lista de productos por venta
                    // -----------------------------------------------------
                    productosAux.forEach(e => {
                        conn.query(POST_PRODUCTOS_HAS_VENTAS, [e.id_producto, row.insertId, e.cantidad_vendida], (err, rows) => {
                            if (err) {
                                res.status(500)
                                res.send({ respuesta: "error", descripcion: "error al registrar productos de la venta" })
                            }
                        })
                    });

                    // se procede a descontar del inventario o stok los productos
                    // ----------------------------------------------------------
                    productosAux.forEach(e => {
                        conn.query(UPDATE_PRODUCT, [e.cantidad_vendida, e.id_producto], (err, rows) => {
                            if (err) {
                                res.status(500)
                                res.send({ respuesta: "error", descripcion: "error al registrar productos de la venta" })
                            }
                        })
                    });

                })



            }

            res.send({ respuesta: "venta exitosa", detalles: "La venta se ha realizado con exito, revisa la base de datos" })
        }

    })
}

// controlador de personas
// -----------------------
const personaCtrl = {

    // metodo para traer todas las personas de la base de datos
    // --------------------------------------------------------
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

    // metodo para traer una persona
    // -------------------------------
    getOne: (req, res) => {

        // se extrae la informacion enviada desde front
        // --------------------------------------------
        const { id_persona } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETONE, [id_persona], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        if (rows.length <= 0) {
                            res.status(404)
                            res.send({ respuesta: "persona no encontrada", descripcion: "no se encontro la persona en la base de datos" })
                        } else {
                            res.send(rows)
                        }
                    }
                })
            }
        })
    },

    // metodo para guardar personas en la base de datos
    // ------------------------------------------------
    post: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_persona, productos } = req.body
        productosAux = productos
        id_personaAux = id_persona

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {

                // se recorren los productos que llegaron para la venta 
                // para evaliar cada uno
                // ----------------------------------------------------
                productosAux.forEach((e, i) => {
                    console.log(">> ", i)
                    validarProducto(res, conn, e, i)
                });


                // conn.query(POST, [id_persona, nombre_completo], (err, rows) => {

                //     console.log(err)

                //     if (err) {

                //         // error cuando ya existe el id de la persona a agregar
                //         // ----------------------------------------------------
                //         if (err.errno === 1062) {
                //             res.send({ respuesta: "error", descripcion: "ye existe el id ingresado" })
                //         } else {
                //             res.status(500)
                //             res.send({ respuesta: "error", descripcion: "error al ingresar informacion a la bd" })
                //         }

                //     } else {
                //         // Se envia la persona agregada con su correspondiente id
                //         // --------------------------------------------------------
                //         res.send({ id_persona, nombre_completo })
                //     }
                // })
            }
        })
    },

    // metodo para eliminar las personas de la base de datos
    // -------------------------------------------------------
    delete: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_persona } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(DELETE, [id_persona], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al eliminar informacion a la bd" })
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "eliminada", descripcion: "la persona ha sido eliminada" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "la persona no fue encontrada" })
                        }
                    }
                })
            }
        })
    },

    // metodo para actualizar las personas de la base de datos
    // -------------------------------------------------------
    put: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_persona, nombre_completo } = req.body

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(UPDATE, [nombre_completo, id_persona], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al actualizar informacion en la bd" })
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "actualizada", descripcion: "la persona ha sido actualizada" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "la persona no fue encontrada" })
                        }
                    }
                })
            }
        })
    }
}

module.exports = personaCtrl