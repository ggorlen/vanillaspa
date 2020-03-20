const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/foo", (req, res) => {
  try {
    throw {error: "hello world"};
  }
  catch (err) {
    res.status(404).json(err);
  }
});

const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
