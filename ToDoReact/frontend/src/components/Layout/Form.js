import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";

import "./Form.module.css";

import Button from "../Item-Layout/Button";
import Input from "../Item-Layout/Input";

export default function Form({ GetDB }) {
  const ref = useRef();
  const [currentDate, setCurrentDate] = useState("dd-MM-yyyy"); // Estado para controlar o valor do campo de data
  const [IsSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "dd-MM-yyyy"));
  }, [setCurrentDate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (IsSubmit) return; // Impede o envio duplicado enquanto a requisição anterior ainda não foi concluída
    setIsSubmit(true);
    const DadosForm = ref.current;

    if (!DadosForm.tarefa.value) {
      setIsSubmit(false); // Reabilita o botão após o envio do formulário
      return toast.warn("Tarefa não foi informada...");
    } else {
      await axios
        .post(process.env.REACT_APP_DB_API, {
          tarefa: DadosForm.tarefa.value,
          data: currentDate,
          concluido: false,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    GetDB();
    DadosForm.tarefa.value = "";
    setIsSubmit(false);
  }
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <Input
        id="terefa"
        type="text"
        name="tarefa"
        placeholder="Digite sua tarefa aqui..."
      />
      <Button
        text={IsSubmit ? "Adicionando..." : "Adicionar"}
        type={"submit"}
        title={IsSubmit ? "Adicionando..." : "Adicionar"}
        disabled={IsSubmit}
      />
    </form>
  );
}
