import "./Input.module.css";

export default function Input({
  type,

  name,
  placeholder,
  value,
  className,
  onChange,
}) {
  return (
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  );
}


