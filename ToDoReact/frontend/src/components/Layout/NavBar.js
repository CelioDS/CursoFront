import styleExt from "./NavBar.module.css";

import LinkButton from "../Item-Layout/LinkButton";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className={styleExt.main}>
      <nav>
        <LinkButton
          to="/"
          text={"To Do Hitss"}
          extStyle={true}
          className={styleExt.logo}
        />

        <ul>
          <Link>Home</Link>
          <Link to="/ToDo">To Do</Link>
          <Link to="Relatorios">relatorios</Link>
        </ul>
      </nav>
    </main>
  );
}
