import { Link } from "react-router-dom";
import "./LinkButton.module.css";

export default function LinkButton({ to, text, className, onClick }) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {text}
    </Link>
  );
}
