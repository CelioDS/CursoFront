import styleExt from "./Header.module.css";

export default function Header() {
  return (
    <main className={styleExt.main}>
      <h1>Bem-vindo ao nosso Todo List!</h1>
      <p>
        Organize as suas tarefas de forma simples e eficiente. Crie,
        edite e conclua as suas tarefas com facilidade. <br /> Com o nosso Todo
        List, você pode manter o foco nas suas atividades diárias e aumentar a
        sua produtividade. <br />
        Comece agora mesmo e transforme a sua maneira de gerenciar tarefas!!
      </p>
    </main>
  );
}
