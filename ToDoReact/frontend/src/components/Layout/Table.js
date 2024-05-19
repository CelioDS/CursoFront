import styleExt from "./Table.module.css";
import { useEffect, useState } from "react";
import Loading from "../Item-Layout/Loading";
import { MdDelete, MdCheck, MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../Item-Layout/Modal";

export default function Table({ arrayDB, setArrayDB, GetDB, setEditTasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pedingTesks, setPedingTesks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [IsSubmit, setIsSubmit] = useState(false);
  const [tarefaId, setTarefaId] = useState();

  useEffect(() => {
    if (Array.isArray(arrayDB) && arrayDB.length > 0) {
      setCompletedTasks(arrayDB.filter(({ concluido }) => concluido === 1));
      setPedingTesks(arrayDB.filter(({ concluido }) => concluido === 0));
    }
  }, [arrayDB]);

  async function handleExcluir(id) {
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    setIsSubmit(true);
    await axios
      .delete(process.env.REACT_APP_DB_API + id)
      .then(({ data }) => {
        const newDB = arrayDB.filter((tarefa) => tarefa.id !== id);
        setArrayDB(newDB);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    GetDB();

    setIsSubmit(false);
  }

  function handleModal() {
    setOpenModal(true);
  }
  function handleEdit(tarefa) {
    setEditTasks(tarefa);
  }

  async function handleUpdate(tarefa) {
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    setIsSubmit(true);
    await axios
      .put(process.env.REACT_APP_DB_API + tarefa.id, {
        tarefa: tarefa.tarefa,
        concluido: true,
        data: tarefa.data,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    GetDB();

    setIsSubmit(false);
  }

  return (
    <section className={styleExt.section}>
      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleFunction={() => {
            handleExcluir(tarefaId);
          }}
        />
      )}
      <div className={styleExt.Pendentes}>
        <h2>Pendente(s)</h2>

        {pedingTesks && pedingTesks.length === 0 ? (
          <>
            <span>{<Loading />}</span>
            <p>Aguardando dados...</p>
          </>
        ) : (
          pedingTesks.map((tarefa, key) => (
            <div key={key}>
              <aside>
                <h3>{tarefa.tarefa} </h3>
                <p>{tarefa.data}</p>
              </aside>

              <aside>
                <span>Aguardando</span>
                <button
                  className={styleExt.BtnEdit}
                  onClick={() => handleEdit(tarefa)}
                >
                  <MdEdit />
                </button>

                <button
                  className={styleExt.BtnCheck}
                  title="Concluir"
                  disabled={IsSubmit}
                  onClick={() => {
                    handleUpdate(tarefa);
                  }}
                >
                  <MdCheck />
                </button>

                <button
                  className={styleExt.BtnExcluir}
                  title="Excluir"
                  disabled={IsSubmit}
                  onClick={() => {
                    setTarefaId(tarefa.id);
                    handleModal();
                  }}
                >
                  <MdDelete />
                </button>
              </aside>
            </div>
          ))
        )}
      </div>
      <div className={styleExt.Concluidos}>
        <h2>Concluido(s)</h2>

        {completedTasks && completedTasks.length === 0 ? (
          <>
            <span>{<Loading />}</span>
            <p>Aguardando dados...</p>
          </>
        ) : (
          completedTasks.map((tarefa, key) => (
            <div key={key}>
              <aside>
                <h3>{tarefa.tarefa} </h3>
                <p>
                  {tarefa.data} - {tarefa.data}
                </p>
              </aside>

              <aside>
                <span>Finalizado</span>

                <button
                  className={styleExt.BtnExcluir}
                  title="Excluir"
                  disabled={IsSubmit}
                  onClick={() => {
                    setTarefaId(tarefa.id);

                    handleModal();
                  }}
                >
                  <MdDelete />
                </button>
              </aside>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
