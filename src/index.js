import React from 'react'
import ReactDom from 'react-dom'
import reducers from './reducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import DashBoard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import './config'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDom.render(<Provider store={store}>
                  <BrowserRouter>
                    <div>
                      <AuthRoute></AuthRoute>
                      <Switch>
                        <Route path="/bossinfo" component={BossInfo} />
                        <Route path="/geniusinfo" component={GeniusInfo} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/chat/:user" component={Chat} />
                        <Route component={DashBoard} />
                      </Switch>
                    </div>
                  </BrowserRouter>
                </Provider>, 
                document.getElementById('root'))

