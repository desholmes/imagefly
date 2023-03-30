import { AzureFunction, Context } from "@azure/functions";

import {
  areEnvironmentVariablesSet,
  getImageUrl,
  HttpStatusCode,
  sendJsonResponse,
  urlToUint8Array,
  processImage,
  rateLimitExceeded
} from "../utils";
import { imageQueryParamsValidator } from "./validation";

const functionName = "v1Image";

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  if (await rateLimitExceeded(context)) {
    return;
  }
  if (areEnvironmentVariablesSet() !== true) {
    sendJsonResponse(context, HttpStatusCode.INTERNAL_SERVER_ERROR, {
      error: true,
      message: `${functionName}: Missing environment variables, please check logs`
    });
    return;
  }
  const imagePath = context?.bindingData?.imagePath;

  if (!imagePath) {
    context.log.warn(`${functionName}: imagePath is not set`);
    sendJsonResponse(context, HttpStatusCode.BAD_REQUEST, {
      error: true,
      message: "Image path is not set"
    });
    return;
  }

  const { value: queryParams, error: validationError } = imageQueryParamsValidator.validate(
    context.req?.query
  );

  if (validationError) {
    const errorMessage = validationError.details.map((detail) => detail.message).join(",");
    context.log.info(`${functionName}: Invalid request`, errorMessage);
    sendJsonResponse(context, HttpStatusCode.BAD_REQUEST, {
      error: true,
      message: `Invalid request: ${errorMessage}`
    });
    return;
  }

  const imageUrl = getImageUrl(imagePath);

  const imageData = await urlToUint8Array(context, imageUrl);
  if (!imageData) {
    context.log.warn(`${functionName}: imageData is not valid`);
    sendJsonResponse(context, HttpStatusCode.NOT_FOUND, {
      error: true,
      message: "Image does not exist in the origin"
    });
    return;
  }

  context.log.info(
    `${functionName}: Attempting to process imageURL ${imageUrl}, with params ${JSON.stringify(
      queryParams,
      null,
      0
    )}`
  );

  const processedImage = await processImage(context, imageData, queryParams);

  if (!processedImage) {
    context.log.warn(`${functionName}: processedImage unsuccessful`);
    sendJsonResponse(context, HttpStatusCode.INTERNAL_SERVER_ERROR, {
      error: true,
      message: "Unable to process image"
    });
    return;
  }

  context.res = {
    status: HttpStatusCode.OK,
    body: processedImage,
    headers: {
      "content-type": `image/${queryParams.format}`,
      server: "ImageFly",
      "content-length": processedImage.length
    }
  };
  return;
};

export default httpTrigger;
