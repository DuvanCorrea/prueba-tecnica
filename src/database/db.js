const mysql = require("mysql")
const keysDatabase = require("../keys")

// se crea la comunicacion con la base de datos mysql
const mysqlPool = mysql.createPool({
    ost: keysDatabase.host,
    user: keysDatabase.usuarioMysql,
    password: keysDatabase.claveUsuarioMysql,
    database: keysDatabase.nombreDB,
    connectionLimit: 10
})

module.exports = mysqlPool