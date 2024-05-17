import styleExt from "./Modal.module.css";

export default function Modal({ openModal, setOpenModal }) {
  function handleNo() {
    setOpenModal(false);
  }

  return (
    <>
      {openModal && (
        <main className={styleExt.main}>
          <section>
            <span>Você tem certeza que deseja excluir?</span>
            <button
              onClick={() => {
                handleNo();
              }}
            >
              Não
            </button>
            <button>Sim</button>
          </section>
        </main>
      )}
    </>
  );
}
