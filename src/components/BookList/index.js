import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookList = props => {
  const {bookListDetails} = props

  const {coverPic, title, authorName, rating, readStatus, id} = bookListDetails

  return (
    <li className="book-list-container">
      <Link to={`/books/${id}`} className="link-item">
        <img src={coverPic} alt={title} className="cover-img" />
        <div className="text-container">
          <h1 className="book-title margin">{title}</h1>
          <p className="book-author-name margin">{authorName}</p>
          <div className="rating-container margin">
            <p className="rating-status">Avg Rating</p>
            <BsFillStarFill className="star" />
            <p className="rating-status">{rating}</p>
          </div>
          <div className="read-status-container margin">
            <p className="status-title">Status:</p>
            <p className="read-status">{readStatus}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BookList
