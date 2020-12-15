const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.route("/").get(userController.getAllUsers).post(userController.userValidationRules(),userController.validateData,userController.createUser)

router.route("/:id").get(userController.getUser).patch(userController.userValidationRules(),userController.validateData,userController.updateUser).delete(userController.deleteUser)

module.exports = router
