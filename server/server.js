const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
// 解析 application/json
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(9080, function () {
  console.log('node app start at port 9080...')
})