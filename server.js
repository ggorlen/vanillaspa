const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/foo", (req, res) => {
  try {
    throw new Error("hello world");
    //throw {error: "hello world"};
  }
  catch (err) {
    res.json({error: err.message});
  }
});

const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
