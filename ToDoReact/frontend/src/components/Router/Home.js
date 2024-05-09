import { useState, useRef, useEffect } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import Container from "../Layout/Container";
import Input from "../Item-Layout/Input";
import Table from "../Layout/Table";

export default function Home() {
  const ref = useRef();
  const [arrayDB, setArrayDB] = useState([]);

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);
      toast.success('data');
      setArrayDB(res.data);
    } catch (error) {
      toast.error(error);
    }
  }

  console.log(arrayDB);

  useEffect(() => {
    GetDB();
  }, [setArrayDB]);

  return (
    <Container>
      <h1>To Do List React</h1>
      <form ref={ref}>
        <Input
          text="Tarefa"
          placeholder="Digite a tarefa aqui..."
          id="terefa"
          type="text"
          name="tarefa"
        />
      </form>
      <Table arrayDB={arrayDB} />
    </Container>
  );
}
