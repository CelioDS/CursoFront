import styleExt from "./Table.module.css";
import { useEffect, useState } from "react";
import Loading from "../Item-Layout/Loading";
import { MdDelete, MdCheck } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

export default function Table({ arrayDB, setArrayDB }) {
  const [completedTaks, setCompletedTasks] = useState([]);
  const [pedingTesks, setPedingTesks] = useState([]);

  useEffect(() => {
    if (arrayDB) {
      setCompletedTasks(arrayDB.filter(({ concluido }) => concluido === 1));
      setPedingTesks(arrayDB.filter(({ concluido }) => concluido === 0));
    }
  }, [arrayDB]);

  async function handleExcluir(id) {
    await axios
      .delete(process.env.REACT_APP_DB_API + id)
      .then(({ data }) => {
        const newDB = arrayDB.filter((tarefa) => tarefa.id !== id);
        setArrayDB(newDB);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  }
  async function handleUpdate(tarefa) {
    await axios
      .put(process.env.REACT_APP_DB_API + tarefa.id, {
        tarefa: tarefa.tarefa,
        concluido: true,
        data: tarefa.data,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
  }

  return (
    <section>
      <div className={styleExt.Pendentes}>
        <h2>Pendente(s)</h2>

        {arrayDB && arrayDB.length === 0 ? (
          <span>{<Loading />}</span>
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
                  className={styleExt.BtnCheck}
                  title="Concluir"
                  onClick={() => {
                    handleUpdate(tarefa.id);
                  }}
                >
                  <MdCheck />
                </button>

                <button
                  className={styleExt.BtnExcluir}
                  title="Excluir"
                  onClick={() => {
                    handleExcluir(tarefa);
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

        {completedTaks && completedTaks.length === 0 ? (
          <span>{<Loading />}</span>
        ) : (
          completedTaks.map((tarefa, key) => (
            <div key={key}>
              <aside>
                <h3>{tarefa.tarefa} </h3>
                <p>{tarefa.data}</p>
              </aside>

              <aside>
                <span>Finalizado</span>

                <button
                  className={styleExt.BtnExcluir}
                  title="Excluir"
                  onClick={() => {
                    handleExcluir(tarefa.id);
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
