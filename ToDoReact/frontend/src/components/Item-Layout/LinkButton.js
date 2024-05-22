import { Link } from "react-router-dom";
import styleExt from "./LinkButton.module.css";

export default function LinkButton({ to, text, extStyle, onClick }) {
  return (
    <Link to={to} className={extStyle ? "" : styleExt.a} onClick={onClick}>
      {text}
    </Link>
  );
}
