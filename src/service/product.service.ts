import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(process.cwd() + "/src/database/db.json");

const readProduct = () => {
  const products = readFileSync(filePath, "utf-8");

  //   console.log(products.toString());
  return JSON.parse(products);
};

export const productService = { readProduct };
