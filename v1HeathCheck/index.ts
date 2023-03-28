import { AzureFunction, Context } from "@azure/functions";

import { sendJsonResponse, HttpStatusCode, areEnvironmentVariablesSet } from "../utils";

const functionName = "v1HeathCheck";

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  if (areEnvironmentVariablesSet() !== true) {
    sendJsonResponse(context, HttpStatusCode.INTERNAL_SERVER_ERROR, {
      error: true,
      message: `${functionName}: Missing environment variables, please check logs`
    });
    return;
  }

  context.log.info(`${functionName}: Sending health check response`);

  sendJsonResponse(context, HttpStatusCode.OK, {
    error: false,
    message: "Service is available"
  });
  return;
};

export default httpTrigger;
