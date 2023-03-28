import { Context } from "@azure/functions";

interface ResponseBody {
  error: boolean;
  message?: string;
  data?: unknown;
}

/**
 * Send a response to the client
 * @param {Context} context - Azure Function context
 * @param {number} status - HTTP status code
 * @param {ResponseBody} responseBody - Response body
 * @returns {void}
 */
export const sendJsonResponse = (
  context: Context,
  status: number,
  responseBody: ResponseBody
): void => {
  context.res = {
    status,
    body: responseBody,
    headers: {
      "Content-Type": "application/json"
    }
  };
  return;
};
