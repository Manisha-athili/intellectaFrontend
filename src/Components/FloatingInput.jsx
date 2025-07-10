import '../Styles/FloatingInput.css';

const FloatingInput = ({ label, type = "text", name, value, onChange }) => (
  <div className="form-floating">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="floating-input"
      required
    />
    <label htmlFor={name}>{label}</label>
  </div>
);

export default FloatingInput;
