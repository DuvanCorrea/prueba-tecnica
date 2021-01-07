const db = require("../database/db")

// quierys para peticiones a la base de datos
// ------------------------------------------
const GETALL = "SELECT * FROM PERSONAS"
const GETONE = "SELECT * FROM PERSONAS WHERE (id_persona=?)"
const POST = "INSERT INTO PERSONAS (id_persona,nombre_completo) VALUES (?,?)"
const DELETE = "DELETE FROM PERSONAS WHERE (id_persona=?)"
const UPDATE = "UPDATE PERSONAS SET nombre_completo=? WHERE (id_persona=?)"

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
        const { id_persona, nombre_completo } = req.body

        // se guarda la categoria
        db.getConnection((err, conn) => {
            if (err) {
                res.status(500)
                res.send({ respuesta: "error", descripcion: "no se pudo conectar a la base de datos" })
            } else {
                conn.query(POST, [id_persona, nombre_completo], (err, rows) => {

                    console.log(err)

                    if (err) {

                        // error cuando ya existe el id de la persona a agregar
                        // ----------------------------------------------------
                        if (err.errno === 1062) {
                            res.send({ respuesta: "error", descripcion: "ye existe el id ingresado" })
                        } else {
                            res.status(500)
                            res.send({ respuesta: "error", descripcion: "error al ingresar informacion a la bd" })
                        }

                    } else {
                        // Se envia la persona agregada con su correspondiente id
                        // --------------------------------------------------------
                        res.send({ id_persona, nombre_completo })
                    }
                })
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