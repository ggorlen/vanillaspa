const express = require("express");
const fs = require("fs");
const {spawn} = require("child_process");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/spim", (req, res) => {
  fs.watch(filename, () => {
    const ls = spawn('ls', ['-lh', filename])
    ls.stdout.pipe(process.stdout)
  })  
  
});

const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
