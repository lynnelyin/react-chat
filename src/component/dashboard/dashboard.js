import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import { Route, Redirect } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

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
    const page = navList.find(v => v.path == pathname)
    // 让动画生效，只渲染一个Route，根据当前path决定组件
    return (page ? 
      <div>
        <NavBar mode="dark" className="fixed-header">
          {page.title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <QueueAnim type="scaleX" duration={800}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div> : <Redirect to="/msg"></Redirect>
    )
  }
}

export default DashBoard

