const express = require("express")

const userRouter = require("./routes/userRoutes")

const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE")
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use("/api/v1/users", userRouter)

module.exports = app
