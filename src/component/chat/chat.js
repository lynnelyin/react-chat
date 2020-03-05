import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'
import '../../index.css'

@connect(
  state => state,
  {sendMsg, getMsgList, recvMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', showEmoji: false}
  }
  componentDidMount() {
    // 刷新页面时重新发送请求获取消息列表
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  // 离开当前页面时再标记已读
  // 以便在当前页面接收消息时，离开后，不会未读
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  // 修复一开始网格只能显示一行的 bug
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    })
  }
  handleSubmit() {
    if(!this.state.text)
      return
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render() {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿'
                  .split(' ')
                  .filter(v => v)   // 避免出现连续两个空格
                  .map(v => ({text: v}))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(this.props.user._id, userid)
    const chatMsgs = this.props.chat.chatMsg.filter(v => v.chatid == chatid)
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          style={{position:'fixed',top:0,zIndex:'100',width:'100%'}}
        >
          {users[userid].name}
        </NavBar>
       
        <QueueAnim delay={100}>
          {chatMsgs.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from == userid? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ): (
              <List key={v._id}>
                <Item
                  className='chat-me'
                  extra={<img src={avatar} alt="" />}
                >{v.content}</Item>
              </List>
            )
        })}
        </QueueAnim>
       
        <div style={{position: 'fixed', width: '100%', bottom: 0}}>
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({text: v})
              }}
              extra={
                <div>
                  <span 
                    role="img"
                    style={{marginRight: 15}}
                    onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.fixCarousel()
                    }}
                  >
                    😀
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >
            </InputItem>
          </List>
          {this.state.showEmoji? <Grid 
            data={emoji}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el => {
              this.setState({text: this.state.text + el.text})
            }}
          />: null}
        </div>
      </div>
    )
  }
}

export default Chat

