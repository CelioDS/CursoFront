import  styleExt  from "./Header.module.css";

export default function Header() {
  return (
    <main className={styleExt.main}>
      <h1>Bem-vindo ao nosso Todo List!</h1>
      <p>
        Organize suas tarefas de forma simples e eficiente. Crie, edite e
        conclua suas tarefas com facilidade. Com nosso Todo List, você pode
        manter o foco nas suas atividades diárias e aumentar sua produtividade.
      </p>
     
      <p>Comece agora mesmo e transforme sua maneira de gerenciar tarefas!</p>
    </main>
  );
}
