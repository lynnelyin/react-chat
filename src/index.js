import React from 'react'
import ReactDom from 'react-dom'
import reducers from './reducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './app'
import './config'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

if (typeof window !== 'undefined'){
ReactDom.render(<Provider store={store}>
                  <BrowserRouter>
                    <App></App>
                  </BrowserRouter>
                </Provider>, 
                document.getElementById('root'))
}
