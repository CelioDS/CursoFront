import styleExt from "./NavBar.module.css";

import LinkButton from "../Item-Layout/LinkButton";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import CheckMobile from "../Tools/CheckMobile";

export default function NavBar() {
  const checkMobile = useCallback(CheckMobile, []);
  const isMobile = checkMobile();
  const [iconMenu, setIconMenu] = useState();

  useEffect(() => {
    setIconMenu("ss");

    console.log(isMobile);
  }, [isMobile]);

  return (
    <main className={styleExt.main}>
      <nav>
        <LinkButton
          to="/"
          text={"To Do Hitss"}
          extStyle={true}
          className={styleExt.logo}
        />
        {isMobile && <button className={styleExt.menu}>{iconMenu}</button>}

        <ul className={styleExt.isMobile}>
          <Link>Home</Link>
          <Link to="/ToDo">ToDo</Link>
          <Link to="Relatorios">relatorios</Link>
        </ul>
      </nav>
    </main>
  );
}
