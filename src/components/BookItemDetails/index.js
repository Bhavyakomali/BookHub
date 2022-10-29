import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'
import {Component} from 'react'

import Cookies from 'js-cookie'
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

class BookItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    bookDetails: {},
  }

  componentDidMount() {
    this.getBook()
  }

  getFormatData = data => {
    const bookDetails = data.book_details

    const updatedData = {
      aboutAuthor: bookDetails.about_author,
      aboutBook: bookDetails.about_book,
      authorName: bookDetails.author_name,
      coverPic: bookDetails.cover_pic,
      id: bookDetails.id,
      readStatus: bookDetails.read_status,
      rating: bookDetails.rating,
      title: bookDetails.title,
    }
    this.setState({
      bookDetails: updatedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  getBook = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.getFormatData(fetchedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderBookItemDetails = () => {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      readStatus,
      rating,
      title,
    } = bookDetails

    return (
      <div className="book-item-details-container" testid="bookItem">
        <div className="book-item-details-sub-container">
          <img src={coverPic} alt={title} className="book-item-details-img" />
          <div className="book-item-details-text-container">
            <h1 className="book-item-title">{title}</h1>
            <p className="book-item-rating">{authorName}</p>
            <div className="book-item-rating-container">
              <p className="book-item-rating">Avg Rating</p>
              <BsFillStarFill className="book-item-star" />
              <p className="book-item-rating">{rating}</p>
            </div>
            <div className="book-item-read-status-container">
              <p className="book-item-rating">Status:</p>
              <p className="book-item-read-status">{readStatus}</p>
            </div>
          </div>
        </div>
        <hr className="book-item-line" />
        <div className="author-details-container">
          <h1 className="author-heading">About Author</h1>
          <p className="author-description">{aboutAuthor}</p>
        </div>
        <div className="author-details-container">
          <h1 className="author-heading">About Book</h1>
          <p className="author-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getBook()
  }

  renderBookItemLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderBookItemFailureView = () => (
    <FailureView onClickTryAgain={this.onClickTryAgain} />
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookItemDetails()
      case apiStatusConstant.inProgress:
        return this.renderBookItemLoader()
      case apiStatusConstant.failure:
        return this.renderBookItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">
          {this.renderBookDetails()}
          <div className="book-item-details-footer">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default BookItemDetails
