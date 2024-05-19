import styleExt from "./Header.module.css";

export default function Header() {
  return (
    <main className={styleExt.main}>
      <h1>Todo List!</h1>
      <p>
        Com o nosso Todo List, você pode manter o foco nas suas atividades
        diárias e aumentar a sua produtividade. Organize as suas tarefas de
        forma simples e eficiente. <br />
        Crie, edite e conclua as suas tarefas com facilidade. <br />
      </p>
    </main>
  );
}
