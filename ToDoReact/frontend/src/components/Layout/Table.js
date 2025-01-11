import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { MdDelete, MdCheck, MdEdit } from "react-icons/md";

import { useEffect, useLayoutEffect, useState } from "react";

import Select from "../Tools/Select";
import Modal from "../Item-Layout/Modal";
import Input from "../Item-Layout/Input";
import styleExt from "./Table.module.css";
import PieChart from "../Tools/PieCharts";
import Paginação from "../Tools/Paginação";
import Loading from "../Item-Layout/Loading";

export default function Table({
  today,
  GetDB,
  months,
  arrayDB,
  setArrayDB,
  searchMonth,
  setEditTasks,
  handleMonthChange,
}) {
  const [tarefaId, setTarefaId] = useState();
  const [searchText, setSearchText] = useState();
  const [IsSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pedingTesks, setPedingTesks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pedingTasksCount, setPedingTasksCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("dd-MM-yyyy");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [itensPage, setItenspage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(arrayDB.length / itensPage);
  const startIndex = currentPage * itensPage;
  const endIndex = startIndex + itensPage;
  const currentItens = arrayDB.slice(startIndex, endIndex);

  useLayoutEffect(() => {
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
        completedTasksFilter = currentItens.filter(
          ({ concluido, data }) => concluido === 1 && checkMonth(data)
        );
      }
      setCompletedTasks(completedTasksFilter);

      let pedingTasksFilter = [];
      if (today) {
        pedingTasksFilter = arrayDB.filter(
          ({ concluido, data, fixo }) => (concluido === 0 && data === currentDate) || (fixo === 1)
        );
      } else if (searchText) {
        pedingTasksFilter = arrayDB.filter(
          ({ concluido, tarefa, data }) =>
            concluido === 0 &&
            (tarefa.toLowerCase().includes(searchText.toLowerCase()) ||
              data.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else {
        pedingTasksFilter = currentItens.filter(
          ({ concluido, data }) => concluido === 0 && checkMonth(data)
        );
      }
      setPedingTesks(pedingTasksFilter);
    }
  }, [arrayDB, currentDate, today, searchMonth, searchText, currentItens]);

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
        fixo: false
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    GetDB();

    // Inverte o valor
    setIsSubmit((prevState) => !prevState);
  }

  useEffect(() => setCurrentPage(0), [itensPage]);

  return (
    <main className={styleExt.main}>
      <section className={styleExt.header}>
        {today ? (
          <>
            <section className={styleExt.info}>
              <p>Suas tarefas do dia de hoje: </p>
            </section>
          </>
        ) : (
          <div>
            {arrayDB.length > 0 && (
              <div className={styleExt.grafico}>
                <PieChart
                  completed={completedTasksCount}
                  pending={pedingTasksCount}
                />
              </div>
            )}

            <div className={styleExt.filtros}>
              <aside className={styleExt.searchText}>
                <Input
                  id={"searchText"}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={"Pesquise aqui..."}
                  className={styleExt.input}
                />
              </aside>

              <aside className={styleExt.filter}>
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
              </aside>
            </div>
          </div>
        )}
      </section>

      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleFunction={() => {
            handleExcluir(tarefaId);
          }}
        />
      )}
      {!today && (
        <div div className={styleExt.paginacao}>
          <Select setItenspage={setItenspage} itensPage={itensPage} />
          <div>
            <Paginação
              pages={pages}
              currentPage={currentPage}
              itensPage={itensPage}
              setCurrentPage={setCurrentPage}
              setItenspage={setItenspage}
            />
          </div>
        </div>
      )}

      <section className={styleExt.areaTarefas}>
        <aside className={styleExt.Pendentes}>
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
                  <>
                    {today && (
                      <button
                        className={styleExt.btnEdit}
                        title="Editar"
                        disabled={IsSubmit}
                        onClick={() => handleEdit(tarefa)}
                      >
                        <MdEdit />
                      </button>
                    )}

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
                  </>
                </aside>
              </div>
            ))
          )}
        </aside>
        <aside className={styleExt.Concluidos}>
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
                </aside>
              </div>
            ))
          )}
        </aside>
      </section>
      {!today && (
        <div div className={styleExt.paginacao}>
          <div>
            <Paginação
              pages={pages}
              currentPage={currentPage}
              itensPage={itensPage}
              setCurrentPage={setCurrentPage}
              setItenspage={setItenspage}
            />
          </div>
        </div>
      )}
    </main>
  );
}
