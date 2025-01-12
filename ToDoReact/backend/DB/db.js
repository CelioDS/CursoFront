import mysql from "mysql";

export const db = mysql.createConnection({
  host: "db4free.net",
  user: "teste01ada",
  password: "PZXvAFdxa.bh2Yg",
  database: "teste01ada",
});

//conectar ao banco de dados e verificar se deu erro
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados", err);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados");
});
