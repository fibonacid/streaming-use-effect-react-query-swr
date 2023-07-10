import express from "express";
import cors from "cors";
import Dalai from "dalai";

const dalai = new Dalai();

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

app.get("/completion", async (req, res) => {
  const { prompt } = req.query;
  if (!prompt) {
    res.status(400).send("Prompt is required");
    return;
  }
  res.setHeader("Content-Type", "text/plain");
  await dalai.request(
    {
      prompt,
      model: "llama.13B",
      n_predict: 50,
      threads: 1,
    },
    (token) => {
      process.stdout.write(token);
      res.write(token);
    },
  );
  res.end();
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
