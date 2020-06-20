const controllers = require ("./controllers");
const express = require ("express");
const router = express.Router();

router.post ("/register",controllers.register)
router.post ("/login", controllers.login)
router.get ("/users/:username", controllers.getUsers)
router.get ("/user/:username", controllers.getAllUsers)

module.exports = router