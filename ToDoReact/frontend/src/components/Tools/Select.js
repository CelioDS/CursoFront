export default function Select({ setItenspage, itensPage, functionUPDATE }) {
  return (
    <div>
      <label htmlFor="select">Tarefas por pagina : </label>
      <select
        name="select"
        id="select"
        value={itensPage}
        title="Quantidade"
        onChange={(e) => {
          functionUPDATE();
          setItenspage(Number(e.target.value));
        }}
        onClick={() => {
          functionUPDATE();
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}
