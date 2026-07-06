import './Notification.css'
import PropTypes from 'prop-types'

const Notifications = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

Notifications.propTypes = {
  type: PropTypes.oneOf(['success', 'error']),
  message: PropTypes.string
}

export default Notifications