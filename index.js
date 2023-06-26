const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("listening at port ", PORT);
});
