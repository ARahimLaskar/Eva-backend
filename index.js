const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userController } = require("./routes/userRoutes.js");
const { taskController } = require("./routes/taskRoutes.js");
const { authenticate } = require("./Middleware/authenticate.js");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/user", userController);
app.use(authenticate);
app.use("/task", taskController);

const PORT = 8000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("error connecting db");
  }
  console.log("listening at port ", PORT);
});
