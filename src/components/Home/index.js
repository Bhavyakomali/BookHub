import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactSlick from '../ReactSlick'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstant = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getBookList()
  }

  getBookList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const updatedData = data.books.map(eachItem => ({
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        id: eachItem.id,
        title: eachItem.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onClickFindBooks = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/shelf')
  }

  renderBookItemLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickTryAgain = () => {
    this.getBookList()
  }

  renderBookItemFailureView = () => (
    <FailureView onClickTryAgain={this.onClickTryAgain} />
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderBookItemLoader()
      case apiStatusConstant.failure:
        return this.renderBookItemFailureView()
      default:
        return null
    }
  }

  renderBookSuccessView = () => {
    const {topRatedBooks} = this.state
    return <ReactSlick topRatedBooks={topRatedBooks} />
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-main-container">
          <div className="home-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-heading-description">
              You are in the right place. Tell us what titles or generes you
              have enjoyed in the past, and we will give you surprisingly
              insightful recommendations.
            </p>
          </div>
          <div className="slider-show-container">
            <div className="top-rated-books-and-find-books slider ">
              <h1 className="top-rated-books">Top Rated Books</h1>
              <button
                type="button"
                className="find-books-button"
                onClick={this.onClickFindBooks}
              >
                Find Books
              </button>
            </div>
            {this.renderBookDetails()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
