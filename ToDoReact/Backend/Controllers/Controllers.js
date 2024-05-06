import { db } from "../DB/db.js";

export const getDB = (_, res) => {
  const query = "SELECT * FROM todoReact";

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const setDB = (req, res) =>{
  const query = "INSERT INTO todo"
}