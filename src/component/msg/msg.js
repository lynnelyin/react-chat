import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    const msgGroup = {}
    // 按照聊天用户分组，按照 chatid
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 消息列表根据时间戳排序，最新发送过来的消息显示在前面
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).create_time
      const bLast = this.getLast(b).create_time
      return bLast - aLast
    })
    return (
      <div>       
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = lastItem.from == userid? lastItem.to: lastItem.from
          const unreadNum = v.filter(msg => !msg.read && msg.to == userid).length
          if (!userInfo[targetId]) {
            return null
          }
          return (
            <List key={lastItem._id}>
              <Item 
                thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                extra={<Badge text={unreadNum}></Badge>}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{userInfo[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}       
      </div>
    )
  }
}

export default Msg