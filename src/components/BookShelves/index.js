import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import BookList from '../BookList'
import Footer from '../Footer'
import FailureView from '../FailureView'
import LeftNavbar from '../LeftNavbar'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstant = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
  noBooks: 'noBooks',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    label: bookshelvesList[0].label,
    activeStatusId: bookshelvesList[0].id,
    searchText: '',
  }

  // api call

  componentDidMount() {
    this.getBookList()
  }

  // using url api call

  getBookList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
        title: eachItem.title,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  // enter text in search input and updating using setState
  onChangeSearchText = event => {
    this.setState({
      searchText: event.target.value,
    })
  }

  // getting bookList by using keydown property

  onKeyDownSearchText = event => {
    if (event.key === 'Enter') {
      this.getBookList()
    }
  }

  // click event for search button
  onClickSearchText = () => {
    this.getBookList()
  }

  // search input
  renderSearchContainer = () => {
    const {searchText} = this.state

    return (
      <div className="search-icon-and-input-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchText}
          onChange={this.onChangeSearchText}
          onKeyDown={this.onKeyDownSearchText}
        />
        <button
          testid="searchButton"
          type="button"
          className="search-icon-container"
          value={searchText}
          onClick={this.onClickSearchText}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderBookShelvesLeftNavbar = () => {
    const {activeStatusId} = this.state
    return (
      <div className="bookshelves-left-navbar">
        <h1 className="left-navbar-heading">BookShelves</h1>
        <ul className="bookshelves-options">
          {bookshelvesList.map(eachItem => (
            <LeftNavbar
              filterBookDetails={eachItem}
              isActive={eachItem.id === activeStatusId}
              key={eachItem.id}
              getFilterBookDetails={this.getFilterBookDetails}
            />
          ))}
        </ul>
      </div>
    )
  }

  getFilterBookDetails = (value, label, id) => {
    this.setState(
      {
        bookshelfName: value,
        label,
        activeStatusId: id,
      },
      this.getBookList,
    )
  }

  renderViewBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookList()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderBookList = () => {
    const {booksList} = this.state

    return (
      <>
        {booksList.length === 0 ? (
          this.renderNoBooksDisplay()
        ) : (
          <ul className="bookshelves-show-container">
            {booksList.map(eachItem => (
              <BookList bookListDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="bookshelves-failure-view-container">
      <FailureView onClickTryAgain={this.onClickTryAgain} />
    </div>
  )

  onClickTryAgain = () => {
    const {searchText} = this.state
    this.getBookList()
    console.log(searchText)
  }

  renderNoBooksDisplay = () => {
    const {searchText} = this.state
    return (
      <div className="no-books-container">
        <img
          src="https://res.cloudinary.com/doyqonmls/image/upload/v1666938868/Asset_1_1_nurdtq.png"
          alt="no books"
          className="no-books-image"
        />
        <p className="search-result">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  // while loading
  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader className="loader" height={50} width={50} />
    </div>
  )

  // rendering UI
  render() {
    const {label} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          <div className="bookshelves-sub-container">
            <div className="mobile-search-input-container">
              {this.renderSearchContainer()}
            </div>
            <div className="bookshelves-left-navbar">
              {this.renderBookShelvesLeftNavbar()}
            </div>
            <div className="render-book-list-container">
              <div className="desktop-search-container">
                <h1 className="desktop-container-search-heading">
                  {label} Books
                </h1>
                {this.renderSearchContainer()}
              </div>
              <div className="render-view-books-container">
                {this.renderViewBooks()}
                <div className="footer-list">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
