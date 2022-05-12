const express =  require("express")
const router = express.Router()
const userController = require("../controllers/api_user")
const AuthMiddleware = require("../middleware/auth")
const {admin ,viewer,editor} = require("../middleware/roles")

router.get("/:id/email",AuthMiddleware,viewer,userController.find_user)
router.get("/email",AuthMiddleware,viewer,userController.find_all_users)


module.exports = router