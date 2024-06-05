import { useEffect, useState } from "react";

import styleExt from "./Header.module.css";
import imagemtodo from "../img/todoimagem.webp";
import LinkButton from "../Item-Layout/LinkButton";

export default function Header() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getMotivationalQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random?lang=pt", {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });
        const data = await response.json();
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error("Erro ao obter a frase:", error);
      }
    }

    getMotivationalQuote();
  }, [setContent, setAuthor]);

  return (
    <main className={styleExt.main}>
      <section className={styleExt.sectionTitle}>
        <h1>Bem-vindo ao nosso Todo List!</h1>
        <br />
        <p>
          Com o nosso Todo List, você pode manter o foco nas suas atividades
          diárias e aumentar a sua produtividade. <br />
          Organize as suas tarefas de forma simples e eficiente. <br />
          <br />
          Crie, edite e conclua as suas tarefas com facilidade. <br />
        </p>
        <br />
        <LinkButton
          to="/Tarefas"
          text={"Clique aqui..."}
          extStyle={true}
          className={styleExt.btnHeader}
        />
      </section>

      <aside className={styleExt.sectionImg}>
        <img src={imagemtodo} alt="imagem todo" />
      </aside>
      <aside className={styleExt.sectionTexto}>
        <span>{content }</span>
        <br />
        <small>"{author}"</small>
        <br />
      </aside>
    </main>
  );
}
