import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { useEffect, useRef, useState } from "react";

import styleExt from "./Form.module.css";
import Input from "../Item-Layout/Input";
import Button from "../Item-Layout/Button";

export default function Form({ GetDB, editTasks, setEditTasks }) {
  const ref = useRef();
  const DadosForm = ref.current;
  const [currentDate, setCurrentDate] = useState("dd-MM-yyyy");
  const [IsSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "dd-MM-yyyy"));
  }, [setCurrentDate]);

  useEffect(() => {
    const DadosForm = ref.current;

    if (editTasks) {
      DadosForm.tarefa.value = editTasks.tarefa;
    }
  }, [editTasks]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    setIsSubmit((prevState) => !prevState);

    if (!DadosForm.tarefa.value) {
      setIsSubmit(false); // Reabilita o botão após o envio do formulário
      return toast.warn("Tarefa não foi informada...");
    }
    if (editTasks) {
      await axios
        .put(process.env.REACT_APP_DB_API + editTasks.id, {
          tarefa: DadosForm.tarefa.value,
          concluido: editTasks.concluido,
          data: editTasks.data,
          fixo : editTasks.fixo
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));

      setEditTasks("");
    } else {
      await axios
        .post(process.env.REACT_APP_DB_API, {
          tarefa: DadosForm.tarefa.value,
          data: currentDate,
          concluido: false,
          fixo: false
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    GetDB();
    DadosForm.tarefa.value = "";
    setIsSubmit((prevState) => !prevState);
  }
  return (
    <form ref={ref} onSubmit={handleSubmit} className={styleExt.form}>
      <Input
        id="terefa"
        type="text"
        name="tarefa"
        placeholder="Digite sua tarefa aqui..."
      />

      <Button
        text={
          IsSubmit
            ? editTasks
              ? "Atualizando..."
              : "Adicionando..."
            : editTasks
            ? "Editando..."
            : "Adicionar"
        }
        type={"submit"}
        title={IsSubmit ? "Adicionando..." : "Adicionar"}
        disabled={IsSubmit}
      />
    </form>
  );
}
