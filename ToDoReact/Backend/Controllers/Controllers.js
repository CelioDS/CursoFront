import { db } from "../DB/db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM todoReact ";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const setDB = (req, res) => {
  const query = "INSERT INTO todoReact";

  const values = [
    req.body.tarefa,
    req.body.concluido,
    req.body.data,
    req.body.quantidade,
  ];
  db.query(query, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Cadastrado a tarefa");
  });
};

export const updateDB = (req, res) => {
  const query =
    "UPDATE todoReact SET `tarefa` = ?, `concluido` = ? , `data` = ? , quantidade = ? WHERE `id` = ? ";

  const values = [
    req.body.tarefa,
    req.body.concluido,
    req.body.data,
    req.body.quantidade,
  ];
  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada....");
  });
};

export const deleteDB = (req, res) => {
  const query = "DELETE FROM dados WHERE `id` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Tarefa deletada");
  });
};
