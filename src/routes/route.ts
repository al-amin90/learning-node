import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controller/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    // console.log("this is root route");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this is root route" }));
  } else if (url === "/products") {
    productController(req, res);
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Route is not found");
  }
};

export default routeHandler;
