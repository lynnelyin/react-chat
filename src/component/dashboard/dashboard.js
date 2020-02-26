import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class DashBoard extends React.Component {
  componentDidMount() {
    // 防止多次调用 socket 监听，造成发送的消息在对话列表显示重复
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const user = this.props.user
    const {pathname} = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      },
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type == 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar mode="dark" className="fixed-header">
          {navList.find(v => v.path == pathname).title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route path={v.path} key={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default DashBoard

