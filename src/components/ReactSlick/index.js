import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {topRatedBooks} = this.props

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachLogo => {
          const {id, coverPic, title, authorName} = eachLogo
          return (
            <ul className="slick-item home-book-list" key={id}>
              <li>
                <Link to={`/books/${id}`} className="home-link-item">
                  <img className="logo-image" src={coverPic} alt={title} />
                  <h1 className="top-rated-book-heading">{title}</h1>
                  <p className="top-rated-book-author">{authorName}</p>
                </Link>
              </li>
            </ul>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
