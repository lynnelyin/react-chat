const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')


io.on('connection', function(socket) {
  socket.on('sendMsg', function(data) {
      console.log(data)
      const {from, to, msg} = data
      const chatid = [from, to].sort().join('_')
      Chat.create({chatid, from, to, content: msg}, function (err, doc) {
        // mongoose 返回的对象其实是在 _doc 属性下，如果要增加属性，要操作该对象
        io.emit('recvMsg', Object.assign({}, doc._doc))
      })
  })
})

app.use(cookieParser())
// 解析 application/json
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9080, function () {
  console.log('node app start at port 9080...')
})