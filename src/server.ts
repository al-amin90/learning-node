import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("this is root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this is root route" }));
  } else if (url === "/product" && method === "GET") {
    // console.log("this is root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this is product route" }));
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Route is not found");
  }
});

server.listen(5000, () => {
  console.log("server is running on server on 5000");
});
