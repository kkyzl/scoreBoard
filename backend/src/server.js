import cors from "cors";
import express, { application } from "express";
import db from "./db";
import ScoreCardRouter from "./routes/scoreCard";
import path from "path";
// main function of Server(entry point)

db.connect();
//db.on("error", (err) => console.log(err));
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(express.json());

//app.use("/card", ScoreCardRouter);
app.use("/", ScoreCardRouter);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");s
// });

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is up on port ${port}!`));
