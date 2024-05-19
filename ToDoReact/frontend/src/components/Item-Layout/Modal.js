import styleExt from "./Modal.module.css";

export default function Modal({ openModal, setOpenModal, handleFunction }) {
  return (
    <>
      {openModal && (
        <main className={styleExt.main}>
          <section>
            <span>Você tem certeza que deseja excluir?</span>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Não
            </button>
            <button
              onClick={() => {
                handleFunction();
                setOpenModal(false);
              }}
            >
              Sim
            </button>
          </section>
        </main>
      )}
    </>
  );
}
