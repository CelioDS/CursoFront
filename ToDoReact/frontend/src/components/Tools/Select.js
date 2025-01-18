export default function Select({ setItenspage, itensPage,  }) {
  return (
    <div>
      <label htmlFor="select">Tarefas por pagina : </label>
      <select
        name="select"
        id="select"
        value={itensPage}
        title="Quantidade"
        onChange={(e) => {
          setItenspage(Number(e.target.value));
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
      </select>
    </div>
  );
}
