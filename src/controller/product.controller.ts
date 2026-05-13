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

    const products = await productService.readProduct();

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);
    // console.log("products", products);
    productService.insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Post Successfully",
        data: products,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    //   Put Single Product
    const products = await productService.readProduct();

    const body = await parseBody(req);

    const index = products.findIndex((d: IProduct) => d.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
          data: null,
        }),
      );
    }

    const updateProduct = {
      id: products[index].id,
      ...body,
    };

    products[index] = updateProduct;
    productService.insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Update Successfully",
        data: products,
      }),
    );
  }
};

export default productController;
