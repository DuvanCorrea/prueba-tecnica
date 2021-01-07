const db = require("../database/db")

// quiery
// ------
const GETALL = "SELECT * FROM CATEGORIAS"

// metodo para optener todas las categorias existentes en la base de datos
// y utilizarlas de forma interna en la api
// -----------------------------------------------------------------------
const obtenerCategorias = ({ req, res }) => {
    db.getConnection((err, conn) => {
        if (err) {
            return false
        } else {
            conn.query(GETALL, (err, rows) => {
                if (err) {
                    return false
                } else {
                    return rows
                }
            })
        }
    })

}

module.exports = obtenerCategorias