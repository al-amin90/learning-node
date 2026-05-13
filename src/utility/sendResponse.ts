import type { ServerResponse } from "http";

const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any,
) => {
  const response = {
    success,
    message,
    data,
  };

  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};

export default sendResponse;
