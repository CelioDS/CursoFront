import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { MdDelete, MdCheck, MdEdit } from "react-icons/md";
import { BsBookmarkCheckFill, BsBookmarkCheck } from "react-icons/bs";

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
  const [handleNumberEdit, setHandleNumberEdit] = useState(1);
  const [idFirst, setIdFirst] = useState();

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

    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayDB]);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, "dd-MM-yyyy"));
  }, []);

  function handleFilter() {
    function checkMonth(data) {
      if (!searchMonth) return true;
      const partMonth = data.split("-");
      const month = partMonth[1];

      return month === searchMonth;
    }

    if (Array.isArray(arrayDB) && arrayDB.length > 0) {
      let completedTasksFilter = [];
      let pendingTasksFilter = [];

      if (today) {
        completedTasksFilter = arrayDB.filter(
          ({ concluido, data, ocultar }) =>
            concluido === 1 && data === currentDate && ocultar === 0
        );
        pendingTasksFilter = arrayDB.filter(
          ({ concluido, data, fixo, ocultar }) =>
            (concluido === 0 && data === currentDate && ocultar === 0) ||
            fixo === 1
        );
      } else if (searchText) {
        completedTasksFilter = arrayDB.filter(
          ({ concluido, tarefa, data, ocultar }) =>
            concluido === 1 &&
            ocultar === 0 &&
            (tarefa.toLowerCase().includes(searchText.toLowerCase()) ||
              data.toLowerCase().includes(searchText.toLowerCase()))
        );
        pendingTasksFilter = arrayDB.filter(
          ({ concluido, tarefa, data, ocultar }) =>
            concluido === 0 &&
            ocultar === 0 &&
            (tarefa.toLowerCase().includes(searchText.toLowerCase()) ||
              data.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else {
        completedTasksFilter = currentItens.filter(
          ({ concluido, data, ocultar }) =>
            concluido === 1 && checkMonth(data) && ocultar === 0
        );
        pendingTasksFilter = currentItens.filter(
          ({ concluido, data, ocultar }) =>
            concluido === 0 && checkMonth(data) && ocultar === 0
        );
      }

      setCompletedTasks(completedTasksFilter);
      setPedingTesks(pendingTasksFilter);
    }
  }

  async function handleExcluir(id) {
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    setIsSubmit(true);

    /* teste ocultar inves de excluir
    await axios
      .delete(process.env.REACT_APP_DB_API + id)
      .then(({ data }) => {
        const newDB = arrayDB.filter((tarefa) => tarefa.id !== id);
        setArrayDB(newDB);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  
    */
    const newDB = arrayDB.filter((tarefa) => tarefa.id === id);

    await axios
      .put(process.env.REACT_APP_DB_API + newDB[0].id, {
        tarefa: newDB[0].tarefa,
        concluido: newDB[0].concluido,
        data: newDB[0].data,
        fixo: 0,
        ocultar: 1,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    GetDB();

    setIsSubmit((prevState) => !prevState);
  }

  function handleModal() {
    setOpenModal((prevState) => !prevState);
  }

  function handleEdit(tarefa) {
    // verificar se o id esta vazio e insere o primeiro id
    if (!idFirst) {
      setIdFirst(tarefa.id);
    }

    if (idFirst === tarefa.id) {
      // verifica se o id recebeu 2 click e cancela a edição
      if (handleNumberEdit % 2 === 0) setEditTasks("cancelado");
      else {
        setEditTasks(tarefa);
      }
    } else {
      // se nenhuma condição é antiginda, nova tarefa, novo id e nova cotagem inicia
      setEditTasks(tarefa);
      setIdFirst(tarefa.id);
      setHandleNumberEdit(1);
    }
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
        fixo: false,
        ocultar: 0,
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    GetDB();

    // Inverte o valor
    setIsSubmit((prevState) => !prevState);
  }

  async function HandleFixar(tarefa) {
    if (IsSubmit) return;
    setIsSubmit((prevState) => !prevState);
    await axios
      .put(process.env.REACT_APP_DB_API + tarefa.id, {
        tarefa: tarefa.tarefa,
        concluido: tarefa.concluido,
        data: tarefa.data,
        fixo: !tarefa.fixo,
        ocultar: 0,
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
                        title={
                          handleNumberEdit % 2 === 0 && tarefa.id === idFirst
                            ? "Cancelar"
                            : "Editar"
                        }
                        disabled={IsSubmit}
                        onClick={() => {
                          handleEdit(tarefa);
                          setHandleNumberEdit(
                            (prevState) => prevState + 1,
                            tarefa.id
                          );
                        }}
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
                    <button
                      className={styleExt.btnFixar}
                      onClick={() => {
                        HandleFixar(tarefa);
                      }}
                      title={tarefa.fixo === 0 ? "Fixar" : "desafixar"}
                      disabled={IsSubmit}
                    >
                      {tarefa.fixo === 1 ? (
                        <BsBookmarkCheckFill />
                      ) : (
                        <BsBookmarkCheck />
                      )}
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
