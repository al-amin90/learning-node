import type { IncomingMessage, ServerResponse } from "http";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    const data = [{ id: 43, category: "silver egale" }];
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product Retrived Successfully", data }));
  }
};

export default productController;
