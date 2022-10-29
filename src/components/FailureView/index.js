import './index.css'

const FailureView = props => {
  const {onClickTryAgain} = props

  const onClickTry = () => {
    onClickTryAgain()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/doyqonmls/image/upload/v1666864912/Group_7522_cvosps.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={onClickTry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
