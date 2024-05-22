import styleExt from "./Input.module.css";

export default function Input({
  type,
  name,
  placeholder,
  onChange,
  className,
}) {
  return (
    <input
      className={className || styleExt.input}
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      minLength={3}
      onChange={onChange}
      maxLength={46}
      required
    />
  );
}
