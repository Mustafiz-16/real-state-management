function InputField({ label, type, name, placeholder, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;
