import styleExt from "./Header.module.css";
import imagemtodo from "../img/todoimagem.webp";
import LinkButton from "../Item-Layout/LinkButton";

export default function Header() {
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
        <small>Acredite em si mesmo. Você é mais capaz do que imagina...</small>
        <br />
      </aside>
    </main>
  );
}
