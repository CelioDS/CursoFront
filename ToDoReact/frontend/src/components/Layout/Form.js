import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";

import "./Form.module.css";

import Button from "../Item-Layout/Button";
import Input from "../Item-Layout/Input";

export default function Form() {
  const ref = useRef();
  const [currentDate, setCurrentDate] = useState("yyyy-MM-dd"); // Estado para controlar o valor do campo de data
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const today = new Date();

    setCurrentDate(format(today, "yyyy-MM-dd"));
  }, [setCurrentDate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const DadosForm = ref.current;
    console.log("clicou" + DadosForm.tarefa.value);

    if (!DadosForm.tarefa.value) {
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
    DadosForm.tarefa.value = "";
  }
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <Input
        id="terefa"
        type="text"
        name="tarefa"
        placeholder="Digite a tarefa aqui..."
      />
      <Button text={"Adicionar"} type={"submit"} />
    </form>
  );
}
