const fs = require("fs");

//reading the file text
const readText =  fs.readFileSync("./texts/read.txt", "utf-8")
console.log(readText);

//writing the file text

const writtenText = fs.writeFileSync("./texts/write.txt", readText + "this is my written text")
console.log(writtenText);