const express = require("express")
const router = express.Router()
const ventaCtrl = require("../controladores/ventaCtrl")


router.post("/venta", ventaCtrl.post) //

module.exports = router