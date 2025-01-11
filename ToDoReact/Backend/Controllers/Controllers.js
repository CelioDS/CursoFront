import { db } from "../DB/db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM todoReact ";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const setDB = (req, res) => {
  const query =
    "INSERT INTO todoReact (`tarefa`, `concluido`, `prioridade`, `data`) VALUES(?)";

  const values = [
    req.body.tarefa,
    req.body.concluido,
    req.body.prioridade, // Adicionando a prioridade
    req.body.data,
  ];
  db.query(query, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Tarefa adicionada...");
  });
};

export const updateDB = (req, res) => {
  const query =
    "UPDATE todoReact SET `tarefa` = ?, `concluido` = ?, `prioridade` = ?, `data` = ? WHERE `id` = ?";

  const values = [
    req.body.tarefa,
    req.body.concluido,
    req.body.prioridade, // Adicionando a prioridade
    req.body.data,
  ];

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada...");
  });
};

export const deleteDB = (req, res) => {
  const query = "DELETE FROM todoReact WHERE `id` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Tarefa deletada...");
  });
};
