const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth")


router.post('/signup',authController.user_signup)
router.post('/login',authController.user_login)



module.exports = router;