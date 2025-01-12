import axios from "axios";
import { toast } from "react-toastify";
import { useState, useLayoutEffect } from "react";

import "./Tarefas.module.css";
import Form from "../Layout/Form";
import Table from "../Layout/Table";
import Container from "../Layout/Container";
import RenameTitle from "../Tools/RenameTitle";

export default function Home() {
  const [arrayDB, setArrayDB] = useState([]);
  const [editTasks, setEditTasks] = useState();

  async function GetDB() {
    try {
      const res = await axios.get(process.env.REACT_APP_DB_API);

      setArrayDB(res.data);
    } catch (error) {
      toast.error(error);
    }
  }

  useLayoutEffect(() => {
    GetDB();
  }, [setArrayDB]);

  return (
    <Container>
      <RenameTitle initialTitle={"To Do - Tarefas "} />
      <Form GetDB={GetDB} editTasks={editTasks} setEditTasks={setEditTasks} />
      <Table
        arrayDB={arrayDB}
        setArrayDB={setArrayDB}
        GetDB={GetDB}
        setEditTasks={setEditTasks}
        today={true}
      />
    </Container>
  );
}
