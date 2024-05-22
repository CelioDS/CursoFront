import Container from "../Layout/Container";
import { useState, useEffect } from "react";
import Form from "../Layout/Form";
import Table from "../Layout/Table";

import "./ToDo.module.css";
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

  useEffect(() => {
    GetDB();
  }, [setArrayDB]);

  return (
    <Container>
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
