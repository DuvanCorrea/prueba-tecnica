const express = require("express")
const router = express.Router()
const categoriaCtrl = require("../controladores/categoriaCtrl")

router.get("/categoria", categoriaCtrl.getAll)
router.get("/categoria/:id_categoria", categoriaCtrl.getOne)
router.post("/categoria", categoriaCtrl.post)
router.delete("/categoria/:id_categoria", categoriaCtrl.delete)
router.put("/categoria", categoriaCtrl.put)


module.exports = router