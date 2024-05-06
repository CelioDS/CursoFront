import { useState, useRef, useEffect } from "react";

import Container from "../Layout/Container";
import Input from "../Item-Layout/Input";

export default function Home() {
  const ref = useRef();
  return (
    <Container>
      <h1>Digite suas tarefas aqui</h1>
      <form ref={ref}>
        <Input
          text="Tarefa"
          placeholder="Digite a tarefa aqui..."
          id="terefa"
          type="text"
          name="tarefa"
        />
      </form>
    </Container>
  );
}
