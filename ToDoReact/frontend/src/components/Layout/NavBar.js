import styleExt from "./NavBar.module.css";

import LinkButton from "../Item-Layout/LinkButton";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import CheckMobile from "../Tools/CheckMobile";

export default function NavBar() {
  const checkMobile = useCallback(CheckMobile, []);
  const isMobile = checkMobile();
  const [iconMenu, setIconMenu] = useState();
  const [linkAtivo, setLinkAtivo] = useState("Home");

  useEffect(() => {
    setIconMenu("ss");
  }, [isMobile]);

  useEffect(() => {
    // Criando o MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "childList" &&
          mutation.target === document.querySelector("title")
        ) {
          setLinkAtivo(mutation.target.textContent.split(" ")[0]);
        }
      }
    });

    // Observando mudanças no nó do título
    observer.observe(document.querySelector("title"), {
      subtree: true,
      characterData: true,
      childList: true,
    });

    // Função de limpeza para desconectar o MutationObserver ao desmontar o componente
    return () => {
      observer.disconnect();
    };
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
        {isMobile && <button className={styleExt.menu}>{iconMenu}</button>}

        <ul className={styleExt.isMobile}>
          <Link style={linkAtivo === "Home" ? { color: "#ff7300" } : {}} to="/">
            Home
          </Link>
          <Link
            style={linkAtivo === "Tarefas" ? { color: "#ff7300" } : {}}
            to="/Tarefas"
          >
            Tarefas
          </Link>
          <Link
            style={linkAtivo === "Relatorios" ? { color: "#ff7300" } : {}}
            to="Relatorios"
          >
            relatorios
          </Link>
        </ul>
      </nav>
    </main>
  );
}
