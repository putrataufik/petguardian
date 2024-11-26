function Input({ type, placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 mb-2 w-full rounded"
      />
    );
  }
  
  export default Input;
  