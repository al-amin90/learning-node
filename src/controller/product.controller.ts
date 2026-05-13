import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import parseBody from "../utility/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  //   get all products
  if (url === "/products" && method === "GET") {
    const products = await productService.readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrived Successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    //   Get Single Product
    const products = await productService.readProduct();

    const product = products.find((d: IProduct) => d.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Retrived Successfully",
        data: product,
      }),
    );
  } else if (url === "/products" && method === "POST") {
    const body = await parseBody(req);

    console.log("body", body);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Post Successfully",
        //   data: product,
      }),
    );
  }
};

export default productController;
