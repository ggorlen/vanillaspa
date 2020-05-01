const express = require("express");
const fs = require("fs");
const {spawn} = require("child_process");
const {v4: uuidv4} = require("uuid");

const app = express();
const tempDir = "/tmp/mips";
fs.mkdirSync(tempDir, {recursive: true});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/spim", (req, res) => {
  const id = uuidv4();
  const file = `${tempDir}/${id}`;

  const hello = `
        .data
msg:   .asciiz "Hello World"
	.extern foobar 4

        .text
        .globl main
main:   li $v0, 4       # syscall 4 (print_str)
        la $a0, msg     # argument: string
        syscall         # print the string
        lw $t1, foobar
        
        jr $ra          # retrun to caller`
  
  fs.writeFile(file, hello, (err) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
  
    const child = spawn(`spim -f ${file}`);
    //const child = spawn(`ls`);
    //process.stdin.pipe(child.stdin);
    let stdout = "";
    
    child.stdout.on("data", data => {
      stdout += data;
    });
    
    child.on("exit", (code, signal) => {
      res.send("done: " + stdout);
    });
    
    child.on("error", (code, signal) => {
      res.send("done: " + stdout);
    });
    
    //fs.unlink temp file
  }); 
});

const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
