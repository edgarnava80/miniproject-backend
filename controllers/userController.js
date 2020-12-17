const { body, validationResult } = require("express-validator")
const models = require("../models/index")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll()

    res.status(200).json({
      status: "exito",
      results: users.length,
      users
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "There was a problem!"
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await models.User.findAll({
      where: {
        id: req.params.id
      }
    })
    if (user.length) {
      res.status(200).json({
        status: "exito",
        user
      })
    } else {
      res.status(404).json({
        status: "fail",
        message: "Inexistent user!"
      })
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "There was a problem!"
    })
  }
}
exports.userValidationRules = () => {
  return [body("firstName").notEmpty().withMessage("You must provide your first name.").trim().escape(), body("lastName").notEmpty().withMessage("You must provide your last name.").trim().escape(), body("email").isEmail().withMessage("You must provide a valid email address.").normalizeEmail()]
}

exports.validateData = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

exports.createUser = async (req, res) => {
  try {
    console.log(req.body)

    const newUser = await models.User.create(req.body)

    res.status(201).json({
      status: "success",
      user: newUser
    }) // 201 = Created
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updated = await models.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (updated > 0) {
      res.status(200).json({
        status: "success",
        data: {
          updated
        }
      })
    } else {
      res.status(404).json({
        status: "fail",
        message: "Inexistent user!"
      })
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "There was a problem!",
      err
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleted > 0) {
      res.status(200).json({
        status: "success",
        data: {
          deleted
        }
      })
    } else {
      res.status(404).json({
        status: "fail",
        message: "Inexistent user!"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({
      status: "fail",
      message: "There was a problem!",
      err
    })
  }
}
