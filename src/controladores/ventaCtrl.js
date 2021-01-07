const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GET_ONE_PRODUCT = "SELECT * FROM PRODUCTOS WHERE (id_producto=?)"
const POST_VENTA = "INSERT INTO VENTAS (fecha, personas_id_persona) VALUES (?,?)"
const POST_PRODUCTOS_HAS_VENTAS = "INSERT INTO PRODUCTOS_HAS_VENTAS (productos_id_producto, ventas_id_venta, cantidad) VALUES (?,?,?)"
const UPDATE_PRODUCT = "UPDATE PRODUCTOS SET stok=stok-? WHERE (id_producto=?)"

// valiables
// ---------
let prodcutosNoEncontrados = []
let productosSinStok = []
let productosAux = []
let id_personaAux = null

// metodo para hacer registro de venta, registrar los productos
// por cada venta y ademas de añadir el cliente a la venta.
//-------------------------------------------------------------
const validarProducto = (res, conn, e, i) => {

    // comienza haciendo peticion producto por producto y validando existencia
    // -----------------------------------------------------------------------
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
                                if (!resposndioACliente) {
                                    resposndioACliente = true
                                    res.status(500)
                                    res.send({ respuesta: "error", descripcion: "error al registrar productos de la venta" })
                                }
                            }
                        })
                    });

                    // se procede a descontar del inventario o stok los productos
                    // ----------------------------------------------------------
                    productosAux.forEach(e => {
                        conn.query(UPDATE_PRODUCT, [e.cantidad_vendida, e.id_producto], (err, rows) => {
                            if (err) {
                                if (!resposndioACliente) {
                                    resposndioACliente = true
                                    res.status(500)
                                    res.send({ respuesta: "error", descripcion: "error al registrar productos de la venta" })
                                }
                            }
                        })
                    });

                    // respuesta si todo ok
                    if (!resposndioACliente) {
                        resposndioACliente = true
                        res.send({ respuesta: "venta exitosa", detalles: "La venta se ha realizado con exito, revisa la base de datos" })
                    }


                })



            }

        }

    })
}

// controlador de ventas
// -----------------------
const vantaCtrl = {

    // metodo para guardar personas en la base de datos
    // ------------------------------------------------
    post: (req, res) => {

        // reiniciando variables
        // ---------------------
        prodcutosNoEncontrados = []
        productosSinStok = []
        productosAux = []
        id_personaAux = null

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_persona, productos } = req.body
        productosAux = []
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
                    validarProducto(res, conn, e, i)
                });
            }
        })
    },

}

module.exports = vantaCtrl