import type { IncomingMessage, ServerResponse } from "http";

const parseBody = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default parseBody;
