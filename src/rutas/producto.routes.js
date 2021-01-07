const express = require("express")
const router = express.Router()
const productoCtrl = require("../controladores/productoCtrl")

router.get("/producto", productoCtrl.getAll)
router.get("/producto/:id_producto", productoCtrl.getOne)
router.post("/producto", productoCtrl.post)
router.delete("/producto/:id_producto", productoCtrl.delete)
router.put("/producto", productoCtrl.put)

module.exports = router