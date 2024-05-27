import styleExt from "./NavBar.module.css";

import LinkButton from "../Item-Layout/LinkButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsList, BsXLg } from "react-icons/bs";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(true);
  const [iconMenu, setIconMenu] = useState();

  useEffect(() => {}, []);

  useState(() => {
    setIsMobile(true);
  }, []);
  return (
    <main className={styleExt.main}>
      <nav>
        <LinkButton
          to="/"
          text={"To Do Hitss"}
          extStyle={true}
          className={styleExt.logo}
        />
        {isMobile && <button>{iconMenu}</button>}
        <ul className={styleExt.NotMobile}>
          <Link>Home</Link>
          <Link to="/ToDo">ToDo</Link>
          <Link to="Relatorios">relatorios</Link>
        </ul>
      </nav>
    </main>
  );
}
