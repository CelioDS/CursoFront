import "./Button.module.css";

export default function Button({ type, text, title }) {
  return (
    <button type={type} title={title}>
      {text}
    </button>
  );
}
