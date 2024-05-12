import { useRef } from "react";

import "./Form.module.css";

import LinkButton from "../Item-Layout/LinkButton";
import Input from "../Item-Layout/Input";

export default function Form() {
  const ref = useRef();

  return (
    <form ref={ref}>
      <Input
        placeholder="Digite a tarefa aqui..."
        id="terefa"
        type="text"
        name="tarefa"
      />
      <LinkButton to={"/"} text={"Adicionar"} onClick={""} />
    </form>
  );
}
