import axios from "axios";
import { toast } from "react-toastify";

import { useLayoutEffect, useState } from "react";

import Table from "../Layout/Table";
import Container from "../Layout/Container";
import styleExt from "./Relatorios.module.css";
import RenameTitle from "../Tools/RenameTitle";

export default function Relatorios() {
  const [arrayDB, setArrayDB] = useState([]);
  const [searchMonth, setSearchMonth] = useState("");

  const months = [
    { value: "", label: "Todos" },
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];
  function handleMonthChange(e) {
    setSearchMonth(e.target.value);
  }

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
      <RenameTitle initialTitle={"To Do - Relatorios"} />
      <main className={styleExt.main}>
        <Table
          arrayDB={arrayDB}
          setArrayDB={setArrayDB}
          GetDB={GetDB}
          today={false}
          handleMonthChange={handleMonthChange}
          searchMonth={searchMonth}
          months={months}
          setSearchMonth={setSearchMonth}
        />
      </main>
    </Container>
  );
}
