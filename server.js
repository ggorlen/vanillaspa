const express = require("express");
const fs = require("fs");
const {spawn} = require("child_process");

const app = express();
const tempDir = "/tmp/mips";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/spim", (req, res) => {
  const id = 
  const child = spawn(``"spim -f tmp/" + );

  fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if (err) {
      return console.log(err);
    }
  
    console.log("The file was saved!");
  }); 

// Or
fs.writeFileSync('/tmp/test-sync', 'Hey there!');
  
  process.stdin.pipe(child.stdin)
  
  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });
});

const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
