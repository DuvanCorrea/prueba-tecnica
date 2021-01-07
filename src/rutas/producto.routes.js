const express = require("express")
const router = express.Router()
const productoCtrl = require("../controladores/productoCtrl")

router.get("/producto", productoCtrl.getAll) // trae todos los productos dela bd

module.exports = router