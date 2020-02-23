import React from 'react'
import Logo from '../../component/logo/logo.js'
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import hocForm from '../../component/hoc-form/hoc-form'


@connect(
  state => state.user,
  {login}
)
@hocForm
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />: null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg? <p className='error-msg'>{this.props.msg}</p>: null}
            <InputItem
              onChange={v => this.props.handleChange('user', v)} 
            >
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button 
            type="primary"
            onClick={this.handleLogin}
          >
            登录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login

