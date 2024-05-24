import styleExt from "./Table.module.css";
import { useEffect, useMemo, useState } from "react";
import Loading from "../Item-Layout/Loading";
import { MdDelete, MdCheck, MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../Item-Layout/Modal";
import { format } from "date-fns";
import Input from "../Item-Layout/Input";

export default function Table({
  arrayDB,
  setArrayDB,
  GetDB,
  setEditTasks,
  today,
  months,
  handleMonthChange,
  searchMonth,
}) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pedingTesks, setPedingTesks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [IsSubmit, setIsSubmit] = useState(false);
  const [tarefaId, setTarefaId] = useState();
  const [currentDate, setCurrentDate] = useState("dd-MM-yyyy"); // Estado para controlar o valor do campo de data
  const [searchText, setSearchText] = useState();
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [pedingTasksCount, setPedingTasksCount] = useState(0);

  const PorcentagemCompleted = useMemo(() => {
    const totalTalks = pedingTasksCount + completedTasksCount;
    return totalTalks > 0 ? (completedTasksCount / totalTalks) * 100 : 0;
  }, [completedTasksCount, pedingTasksCount]);

  useEffect(() => {
    const TasksCountCompleted = arrayDB.reduce((total, task) => {
      return task.concluido === 1 ? total + 1 : total;
    }, 0);
    setCompletedTasksCount(TasksCountCompleted);

    const TasksCountPeding = arrayDB.reduce((total, task) => {
      return task.concluido === 0 ? total + 1 : total;
    }, 0);

    setCompletedTasksCount(TasksCountCompleted);
    setPedingTasksCount(TasksCountPeding);
  }, [arrayDB]);

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "dd-MM-yyyy"));
  }, []);

  useEffect(() => {
    function checkMonth(data) {
      if (!searchMonth) return true;
      const partMonth = data.split("-");
      const month = partMonth[1];

      return month === searchMonth;
    }

    if (Array.isArray(arrayDB) && arrayDB.length > 0) {
      let completedTasksFilter = [];
      if (today) {
        completedTasksFilter = arrayDB.filter(
          ({ concluido, data }) => concluido === 1 && data === currentDate
        );
      } else if (searchText) {
        completedTasksFilter = arrayDB.filter(
          ({ concluido, tarefa, data }) =>
            concluido === 1 &&
            (tarefa.toLowerCase().includes(searchText.toLowerCase()) ||
              data.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else {
        completedTasksFilter = arrayDB.filter(
          ({ concluido, data }) => concluido === 1 && checkMonth(data)
        );
      }
      setCompletedTasks(completedTasksFilter);

      let pedingTasksFilter = [];
      if (today) {
        pedingTasksFilter = arrayDB.filter(
          ({ concluido, data }) => concluido === 0 && data === currentDate
        );
      } else if (searchText) {
        pedingTasksFilter = arrayDB.filter(
          ({ concluido, tarefa, data }) =>
            concluido === 0 &&
            (tarefa.toLowerCase().includes(searchText.toLowerCase()) ||
              data.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else {
        pedingTasksFilter = arrayDB.filter(
          ({ concluido, data }) => concluido === 0 && checkMonth(data)
        );
      }
      setPedingTesks(pedingTasksFilter);
    }
  }, [arrayDB, currentDate, today, searchMonth, searchText]);

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

    setIsSubmit((prevState) => !prevState);
  }

  function handleModal() {
    setOpenModal((prevState) => !prevState);
  }
  function handleEdit(tarefa) {
    setEditTasks(tarefa);
  }

  async function handleUpdate(tarefa) {
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    // Inverte o valor
    setIsSubmit((prevState) => !prevState);
    await axios
      .put(process.env.REACT_APP_DB_API + tarefa.id, {
        tarefa: tarefa.tarefa,
        concluido: true,
        data: tarefa.data,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    GetDB();

    // Inverte o valor
    setIsSubmit((prevState) => !prevState);
  }

  return (
    <section className={styleExt.section}>
      {today ? (
        <>
          <section className={styleExt.info}>
            <p>Suas tarefas do dia de hoje: </p>
          </section>
        </>
      ) : (
        <>
          <>
            {completedTasksCount < 0 && (
              <span>
                Porcentagem de tarefas concluidas
                {PorcentagemCompleted.toFixed(2)}%
              </span>
            )}
          </>
          <Input
            id={"searchText"}
            onChange={(e) => setSearchText(e.target.value)}
            className={styleExt.searchText}
            placeholder={"Pesquise aqui..."}
          />
          <section className={styleExt.filter}>
            <label htmlFor="monthFilter">Filtrar por mês: </label>
            <select
              id="monthFilter"
              value={searchMonth}
              onChange={handleMonthChange}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </section>
        </>
      )}

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
                {today && (
                  <>
                    <button
                      className={styleExt.btnEdit}
                      title="Editar"
                      disabled={IsSubmit}
                      onClick={() => handleEdit(tarefa)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className={styleExt.btnCheck}
                      title="Concluir"
                      disabled={IsSubmit}
                      onClick={() => {
                        handleUpdate(tarefa);
                      }}
                    >
                      <MdCheck />
                    </button>
                    <button
                      className={styleExt.btnDelete}
                      title="Excluir"
                      disabled={IsSubmit}
                      onClick={() => {
                        setTarefaId(tarefa.id);
                        handleModal();
                      }}
                    >
                      <MdDelete />
                    </button>{" "}
                  </>
                )}
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
                <p>{tarefa.data}</p>
              </aside>

              <aside>
                <span>Finalizado</span>

                {today && (
                  <button
                    className={styleExt.btnDelete}
                    title="Excluir"
                    disabled={IsSubmit}
                    onClick={() => {
                      setTarefaId(tarefa.id);

                      handleModal();
                    }}
                  >
                    <MdDelete />
                  </button>
                )}
              </aside>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
