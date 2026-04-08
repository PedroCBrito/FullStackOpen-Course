const InputFieldWithName = ({ text, value, onChange }) => (
  <div>
    {text} <input value={value} onChange={onChange} />
  </div>
)

export default InputFieldWithName