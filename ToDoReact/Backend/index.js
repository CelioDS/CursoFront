import cors from "cors";
import express from "express";
import userRoutes from "./Routes/router.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", userRoutes);

app.listen(8000);
