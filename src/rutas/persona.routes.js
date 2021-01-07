const express = require("express")
const router = express.Router()
const personaCtrl = require("../controladores/personaCtrl")

router.get("/persona", personaCtrl.getAll)
router.get("/persona/:id_persona", personaCtrl.getOne)
router.post("/persona", personaCtrl.post)
router.delete("/persona/:id_persona", personaCtrl.delete)
router.put("/persona", personaCtrl.put)


module.exports = router