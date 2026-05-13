import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import parseBody from "../utility/parseBody";
import sendResponse from "../utility/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  //   get all products
  if (url === "/products" && method === "GET") {
    try {
      const products = await productService.readProduct();

      return sendResponse(
        res,
        200,
        true,
        "Products Retrived Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "GET" && id !== null) {
    //   Get Single Product

    try {
      const products = await productService.readProduct();

      const product = products.find((d: IProduct) => d.id === id);

      if (!product) {
        return sendResponse(res, 404, true, "Product Not Found", null);
      }

      return sendResponse(
        res,
        200,
        true,
        "Product Retrived Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (url === "/products" && method === "POST") {
    try {
      const body = await parseBody(req);

      const products = await productService.readProduct();

      const newProduct = {
        id: Date.now(),
        ...body,
      };

      products.push(newProduct);

      productService.insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product Post Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "PUT" && id !== null) {
    //   Put Single Product

    try {
      const products = await productService.readProduct();

      const body = await parseBody(req);

      const index = products.findIndex((d: IProduct) => d.id === id);

      if (index < 0) {
        return sendResponse(res, 404, true, "Product Not Found", null);
      }

      const updateProduct = {
        id: products[index].id,
        ...body,
      };

      products[index] = updateProduct;
      productService.insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product Update Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "DELETE" && id !== null) {
    //   Delete Product

    try {
      const products = await productService.readProduct();

      const index = products.findIndex((d: IProduct) => d.id === id);

      if (index < 0) {
        return sendResponse(res, 404, true, "Product Not Found", null);
      }

      products.splice(index, 1);
      productService.insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product Delete Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }
};

export default productController;
