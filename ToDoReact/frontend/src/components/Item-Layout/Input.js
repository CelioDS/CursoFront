import styleExt from "./Input.module.css";

export default function Input({ type, name, placeholder }) {
  return (
    <input
      className={styleExt.input}
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      minLength={3}
      maxLength={46}
      required
    />
  );
}
