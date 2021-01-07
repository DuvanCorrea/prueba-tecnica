const express = require("express")
const router = express.Router()
const ventaCtrl = require("../controladores/ventaCtrl")

router.get("/venta", ventaCtrl.getAll)
router.get("/venta/:id_venta", ventaCtrl.getOne)
router.post("/venta", ventaCtrl.post) //
router.delete("/venta/:id_venta", ventaCtrl.delete)
router.put("/venta", ventaCtrl.put)

module.exports = router