import { readFileSync, writeFileSync } from "fs";
import path from "path";

const filePath = path.join(process.cwd() + "/src/database/db.json");

const readProduct = () => {
  const products = readFileSync(filePath, "utf-8");

  //   console.log(products.toString());
  return JSON.parse(products);
};

const insertProduct = (payload: any) => {
  //   console.log(payload);
  writeFileSync(filePath, JSON.stringify(payload));
};

export const productService = { readProduct, insertProduct };
