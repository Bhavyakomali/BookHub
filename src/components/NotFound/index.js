import {Link, withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onClickBackToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/doyqonmls/image/upload/v1666869196/Group_7484_ct2z6p.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-para">
        we are sorry, the page you requested could not be found
      </p>

      <Link to="/">
        <button
          type="button"
          className="notfound-button"
          onClick={onClickBackToHome}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default withRouter(NotFound)
