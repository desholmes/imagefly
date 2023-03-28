import { Context } from "@azure/functions";
import sharp = require("sharp");

interface ImageParams {
  format: "jpg" | "png" | "webp";
  quality: number;
}

/**
 * Process an image
 * @param {Uint8Array} imageData - The image data
 * @param {ImageParams} params - The image params
 * @returns {Promise<false | Buffer>} The processed image or false if an error occurred
 * @see https://sharp.pixelplumbing.com/api-output#toformat
 */
export const processImage = async (
  context: Context,
  imageData: Uint8Array,
  params: ImageParams
) => {
  try {
    return await sharp(imageData)[params?.format]({ quality: params.quality }).toBuffer();
  } catch (error) {
    context.log.warn("processImage: error - ", error);
    return false;
  }
};
