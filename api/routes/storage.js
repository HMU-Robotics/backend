const express = require('express')
const router = express.Router()
const StorageController = require('../controllers/storage')
const AuthMiddleware = require("../middleware/auth")


router.get("/item/:item",AuthMiddleware,StorageController)

router.post("/item/:item",AuthMiddleware,StorageController)

router.get('/item/:itemName',AuthMiddleware,StorageController)

module.exports = router;