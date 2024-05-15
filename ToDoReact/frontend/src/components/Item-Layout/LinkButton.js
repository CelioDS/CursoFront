import { Link } from "react-router-dom";
import styleExt from "./LinkButton.module.css";

export default function LinkButton({ to, text, className, onClick }) {
  return (
    <Link to={to} className={styleExt.a} onClick={onClick}>
      {text}
    </Link>
  );
}
