import React from 'react'
import LogoImage from './job.png'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={LogoImage} alt="" />
      </div>
    )
  }
}

export default Logo