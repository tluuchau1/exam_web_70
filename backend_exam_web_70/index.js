import express from "express";
import { connectToDatabase } from "./config/database.js";
import router from "./routers/index.js";

const app = express();
const Port = 5050;

connectToDatabase();


app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(201).json({
    Message: "Server OK",
  });
});

app.listen(Port, () => console.log(`Server live on ${Port}`));
