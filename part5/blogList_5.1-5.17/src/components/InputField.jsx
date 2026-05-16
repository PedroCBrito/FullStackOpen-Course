import PropTypes from 'prop-types'

const InputField = ({ label, onChange, value }) => {
  return (
    <div>
      {label} <input value={value} onChange={onChange} />
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default InputField