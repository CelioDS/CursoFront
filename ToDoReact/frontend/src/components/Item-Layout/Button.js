import styleExt from "./Button.module.css";

export default function Button({ type, text, title }) {
  return (
    <button type={type} title={title} className={styleExt.button}>
      {text}
    </button>
  );
}
