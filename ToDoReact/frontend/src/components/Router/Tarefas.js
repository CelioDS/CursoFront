import Container from "../Layout/Container";
import { useState, useLayoutEffect } from "react";
import Form from "../Layout/Form";
import Table from "../Layout/Table";
import RenameTitle from "../Tools/RenameTitle";

<<<<<<< HEAD:ToDoReact/frontend/src/components/Router/Tarefas.js
import "./Tarefas.module.css";
=======

import "./ToDo.module.css";
>>>>>>> ab3ba8d33bbbaece4ee9c1a47f5bbc9bdc23c7c8:ToDoReact/frontend/src/components/Router/ToDo.js
import { toast } from "react-toastify";
import axios from "axios";

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
      <RenameTitle initialTitle={"Tarefas - ToDo"} />
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
