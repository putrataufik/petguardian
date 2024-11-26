function Button({ onClick, children, color }) {
    const baseStyles =
      "text-white py-2 px-4 rounded w-full hover:opacity-90 transition-all";
    const colorStyles = color === "red" ? "bg-red-500" : "bg-blue-500";
  
    return (
      <button onClick={onClick} className={`${baseStyles} ${colorStyles}`}>
        {children}
      </button>
    );
  }
  
  export default Button;
  