import "./Input.module.css";

export default function Input({ type, name, placeholder }) {
  return <input id={name} type={type} name={name} placeholder={placeholder} />;
}
