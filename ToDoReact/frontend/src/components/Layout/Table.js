import styleExt from "./Table.module.css";
import { useEffect } from "react";
import Loading from "../Item-Layout/Loading";
import { MdDelete, MdCheck } from "react-icons/md";

export default function Table({ arrayDB }) {
  useEffect(() => {}, []);

  return (
    <section>
      <div className={styleExt.Pendentes}>
        <h2>Pendente(s)</h2>

        {arrayDB && arrayDB.length === 0 ? (
          <span>{<Loading />}</span>
        ) : (
          arrayDB
            .filter(({ concluido }) => {
              return concluido === 0;
            })
            .map((tarefa, key) => (
              <div key={key}>
                <aside>
                  <h3>{tarefa.tarefa} </h3>
                  <p>{tarefa.data}</p>
                </aside>

                <aside>
                  <span>Aguardando</span>

                  <button className={styleExt.BtnCheck} title="Concluir">
                    <MdCheck />
                  </button>

                  <button className={styleExt.BtnExcluir} title="Excluir">
                    <MdDelete />
                  </button>
                </aside>
              </div>
            ))
        )}
      </div>
      <div className={styleExt.Concluidos}>
        <h2>Concluido(s)</h2>

        {arrayDB && arrayDB.length === 0 ? (
          <span>{<Loading />}</span>
        ) : (
          arrayDB
            .filter(({ concluido }) => {
              return concluido === 1;
            })
            .map((tarefa, key) => (
              <div key={key}>
                <aside>
                  <h3>{tarefa.tarefa} </h3>
                  <p>{tarefa.data}</p>
                </aside>

                <aside>
                  <span>Finalizado</span>

                  <button className={styleExt.BtnExcluir} title="Excluir">
                    <MdDelete />
                  </button>
                </aside>
              </div>
            ))
        )}
      </div>
    </section>
  );
}
