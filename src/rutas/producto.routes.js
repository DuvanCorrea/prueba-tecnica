const express = require("express")
const router = express.Router()
const productoCtrl = require("../controladores/productoCtrl")

router.get("/producto", productoCtrl.getAll)
router.post("/producto", productoCtrl.post)

module.exports = router