import React from 'react'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import DashBoard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import {Route, Switch} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(err, info) {
    console.log('err,info:', err, info)
    this.setState({
      hasError: true
    })
  }
  render() {
    return this.state.hasError ? <h1>页面出错啦</h1> : (
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
    )
  }
}

export default App