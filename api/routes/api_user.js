const express =  require("express")
const router = express.Router()
const userController = require("../controllers/user")
const AuthMiddleware = require("../middleware/auth")
const {admin ,viewer,editor} = require("../middleware/roles")

router.get("/user/:id/email",AuthMiddleware,editor || admin)
router.get("/user/email",AuthMiddleware,editor || admin)