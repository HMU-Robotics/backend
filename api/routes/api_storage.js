const express = require('express')
const router = express.Router()
const StorageController = require('../controllers/api_storage')
const AuthMiddleware = require("../middleware/auth")
const {admin,viewer,editor} = require("../middleware/roles")

router.get("/item/all",AuthMiddleware,StorageController.get_all)
router.get("/item/id/:item_id",AuthMiddleware,StorageController.get_by_id)
router.post("/item/newItem",AuthMiddleware,viewer,StorageController.add_new_item)
router.get('/item/name/:itemName',AuthMiddleware,StorageController.get_by_name)

module.exports = router;