const express = require("express")
const router = express.Router()
const personasCtrl = require("../controladores/personaCtrl")

router.get("/persona", personasCtrl.getAll)


module.exports = router