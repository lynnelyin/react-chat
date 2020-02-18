import React from 'react'
import ReactDom from 'react-dom'
import reducers from './reducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import './config'
import 'antd-mobile/dist/antd-mobile.css'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

function Boss() {
  return <h2>Boss</h2>
}

ReactDom.render(<Provider store={store}>
                  <BrowserRouter>
                    <div>
                      <AuthRoute></AuthRoute>
                      <Route path="/boss" component={Boss} />
                      <Route path="/register" component={Register} />
                      <Route path="/login" component={Login} />
                    </div>
                  </BrowserRouter>
                </Provider>, 
                document.getElementById('root'))

