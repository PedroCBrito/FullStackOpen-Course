import PropTypes from 'prop-types'

const PageTitle = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageTitle