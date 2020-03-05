import express from 'express'
import userRouter from './user'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
// 解决css加载问题
import csshook from 'css-modules-require-hook/preset' // import hook before routes
// 解决静态资源加载问题
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png']
})

import React from 'react'
import {renderToString} from 'react-dom/server'   // React组件 => div
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

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
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  
  const store = createStore(reducers, compose(applyMiddleware(thunk)))
  let context = {}
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
        <meta name="description" content="React-App" />
        <title>React App</title>
        <link rel="stylesheet" href="${staticPath['files']['main.css']}" >
        <link rel="stylesheet" href="${staticPath['files']['static/css/1.0030b28a.chunk.css']}" >
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${markup}</div>

        <script src="${staticPath['files']['main.js']}"></script>
        <script src="${staticPath['files']['static/js/1.0294fc01.chunk.js']}"></script>
        <script src="${staticPath['files']['runtime-main.js']}"></script>
      </body>
    </html>
    `
  res.send(pageHtml)
  //return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9080, function () {
  console.log('node app start at port 9080...')
})