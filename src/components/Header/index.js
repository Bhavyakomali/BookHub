import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    isActive: false,
  }

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  scrollOptions = () => (
    <ul className="options-container">
      <li className="nav-item">
        <Link to="/" className="item-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/shelf" className="item-link">
          Bookshelves
        </Link>
      </li>
      <button type="button" className="logout-button">
        Logout
      </button>
      <button type="button" className="close-btn" onClick={this.onClickNavbar}>
        <AiFillCloseCircle className="close-logo" />
      </button>
    </ul>
  )

  onClickNavbar = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  render() {
    const {isActive} = this.state

    return (
      <nav className="navbar-header" fixed="true">
        <div className="nav-content">
          <div className="navbar-mobile-container">
            <div className="navbar-mobile-logo">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/doyqonmls/image/upload/v1666849392/Group_7731_llshxn.png"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <button
                type="button"
                onClick={this.onClickNavbar}
                className="navbar-button"
              >
                <FaBars className="nav-bars" />
              </button>
            </div>
            <div className="scroll-options">
              {isActive && this.scrollOptions()}
            </div>
          </div>
          <div className="navbar-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/doyqonmls/image/upload/v1666849392/Group_7731_llshxn.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="item-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shelf" className="item-link">
                  Bookshelves
                </Link>
              </li>
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogoutBtn}
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
