import axios from "axios"
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOGIN_SUCCESS: 
      return {...state, isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

export function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data }
}

export function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data }
}

export function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

export function loadData(userInfo) {
  return { type: LOAD_DATA, payload: userInfo }
}

export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
          .then(res => {
            if (res.status == 200 && res.data.code == 0) {
              dispatch(loginSuccess(res.data.data))
            } else {
              dispatch(errorMsg(res.data.msg))
            }
          })
  }
}

export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码不能为空')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
          .then(res => {
            if (res.status == 200 && res.data.code == 0) {
              dispatch(registerSuccess({user, type}))
            } else {
              dispatch(errorMsg(res.data.msg))
            }
          })
  }
}

