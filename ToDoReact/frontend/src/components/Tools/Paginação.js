export default function Paginação({
  pages,
  currentPage,
  setCurrentPage,
  functionUPDATE,
}) {
  return Array.from(Array(pages), (item, index) => {
    return (
      <button
        style={
          index === currentPage
            ? { backgroundColor: "#ff7300", color: "#fff" }
            : { color: "#12033d" }
        }
        key={index}
        value={index}
        onClick={(e) => {
          setCurrentPage(Number(e.target.value));
          functionUPDATE();
        }}
        onChange={() => {
          functionUPDATE();
        }}
      >
        {index + 1}
      </button>
    );
  });
}
