import express from "express";
import catalogRouter from "./api/catalog.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "Catalog service is up" });
})

app.use("/", catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
