import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input"
          onChange={this.onChangeUsername}
          placeholder="Username"
          value={username}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="password-input"
          onChange={this.onChangePassword}
          placeholder="Password"
          value={password}
        />
      </>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/doyqonmls/image/upload/v1665981871/Rectangle_1467_1x_urjtc9.png"
          alt="website login"
          className="login-image"
        />
        <img
          src="https://res.cloudinary.com/doyqonmls/image/upload/v1666849161/Ellipse_99_nd1nvk.png"
          alt="prop"
          className="login-image-mobile"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/doyqonmls/image/upload/v1666849392/Group_7731_llshxn.png"
            className="login-logo-image"
            alt="login website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          {showError && <p className="error-msg">*{errorMsg}</p>}
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default LoginRoute
