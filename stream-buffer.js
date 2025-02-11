const http = require('http');
const fs = require('fs')

//creating a server useing raw node.js
const server = http.createServer()

//listener
server.on('request', (req, res) => {
    if(req.url === "/read-file" && req.method === "GET");

    //streaming file reading
    const readableStream = fs.createReadStream(process.cwd() + '/texts/read.txt')

    readableStream.on('data', (buffer) => {
        res.write(buffer)
    });

    readableStream.on('end' , ()=> {
        res.end("the reading is now complete");
    })
})

server.listen(5000, () => {
    console.log('server is listing on port 5000');
})