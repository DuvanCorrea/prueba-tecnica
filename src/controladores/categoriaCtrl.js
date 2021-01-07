const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM CATEGORIAS"
const GETONE = "SELECT * FROM CATEGORIAS WHERE (id_categoria=?)"
const POST = "INSERT INTO CATEGORIAS (nombre_categoria) VALUES (?)"
const DELETE = "DELETE FROM CATEGORIAS WHERE (id_categoria=?)"
const UPDATE = "UPDATE CATEGORIAS SET nombre_categoria=? WHERE (id_categoria=?)"

// controlador de categorias
// -----------------------
const categoriaCtrl = {

    // metodo para traer todas las categorias de la base de datos
    // ----------------------------------------------------------
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

    // metodo para traer una categoria
    // ----------------------------------------------------------
    getOne: (req, res) => {

        // se extrae la informacion enviada desde front
        // --------------------------------------------
        const { id_categoria } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(GETONE, [id_categoria], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al consultar la base de datos" })
                    } else {
                        if (rows.length <= 0) {
                            res.status(404)
                            res.send({ respuesta: "categoria no encontrada", descripcion: "no se encontro la categoria en la base de datos" })
                        } else {
                            res.send(rows)
                        }
                    }
                })
            }
        })
    },

    // metodo para guardar categorias en la base de datos
    // --------------------------------------------------
    post: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { nombre_categoria } = req.body

        // se guarda la categoria
        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(POST, [nombre_categoria], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al ingresar informacion a la bd" })
                    } else {
                        // Se envia la categoria agragada con su correspondiente id
                        // --------------------------------------------------------
                        res.send({ id_categoria: rows.insertId, nombre_categoria: nombre_categoria })
                    }
                })
            }
        })
    },

    // metodo para eliminar las categorias de la base de datos
    // -------------------------------------------------------
    delete: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_categoria } = req.params

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(DELETE, [id_categoria], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al eliminar informacion a la bd" })
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "eliminada", descripcion: "la categoria ha sido eliminada" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "la categoria no fue encontrada" })
                        }
                    }
                })
            }
        })
    },

    // metodo para actualizar las categorias de la base de datos
    // ---------------------------------------------------------
    put: (req, res) => {

        // se extrae la información enviada desde front
        // --------------------------------------------
        const { id_categoria, nombre_categoria } = req.body

        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(UPDATE, [nombre_categoria, id_categoria], (err, rows) => {
                    if (err) {
                        res.status(500)
                        res.send({ respuesta: "error", descripcion: "error al actualizar informacion en la bd" })
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send({ respuesta: "actualizada", descripcion: "la categoria ha sido actualizada" })
                        } else {
                            res.status(404)
                            res.send({ respuesta: "error", descripcion: "la categoria no fue encontrada" })
                        }
                    }
                })
            }
        })
    }
}

module.exports = categoriaCtrl