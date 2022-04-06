const express = require('express')
const router = express.Router()
const StorageController = require('../controllers/storage')
const AuthMiddleware = require("../middleware/auth")
const {admin,viewer,editor} = require("../middleware/roles")

router.get("/item/all",AuthMiddleware,StorageController.get_all)
router.get("/item/:item_id",AuthMiddleware,StorageController.get_by_id)
router.post("/item/newItem",AuthMiddleware,editor||admin,StorageController.add_new_item)
// router.post("/item/:item_id",AuthMiddleware,editor||admin,StorageController)
router.get('/item/:itemName',AuthMiddleware,StorageController.get_by_name)

module.exports = router;