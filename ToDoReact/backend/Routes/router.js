import express from "express";

import {
  getDB,
  setDB,
  updateDB,
  deleteDB,
} from "../Controllers/Controllers.js";

const router = express.Router();

router.get("/", getDB);

router.post("/", setDB);

router.put("/:id", updateDB);

router.delete("/:id", deleteDB);

export default router;
