import "./Table.module.css";

export default function Table({ arrayDB }) {
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>tarefa</th>
            <th>data</th>
            <th>concluido</th>
            <th>quantidade</th>
          </tr>
        </thead>
        <body>
          {arrayDB &&
            arrayDB.map((tarefa, key) => (
              <tr key={key}>
                <td>{tarefa.tarefa}</td>
                <td>{tarefa.data}</td>
                <td>{tarefa.concluido}</td>
                <td>{tarefa.quantidade}</td>
                <h4>5</h4>
              </tr>
            ))}
        </body>
      </table>
    </section>
  );
}
