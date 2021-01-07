const express = require("express")
const router = express.Router()
const personasCtrl = require("../controladores/personaCtrl")

router.get("/persona", personasCtrl.getAll) // trae todas las personas de la bd

module.exports = router