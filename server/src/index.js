import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.send({ status: "ok" }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
