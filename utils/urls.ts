import { Context } from "@azure/functions";
import axios from "axios";
import { ORIGIN } from "../constants";

/**
 * Check if a URL is reachable
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} True if the URL is reachable, false otherwise
 */
export const isUrlReachable = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.get(url);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
};

/**
 * Return the image URL, including the origin
 * @param {string} imagePath - The image path
 * @returns {string} The image URL
 */
export const getImageUrl = (imagePath: string): string => {
  return `${ORIGIN}/${imagePath}`;
};

/**
 * Convert a URL to a Uint8Array
 * @param {string} url - The URL to convert
 * @returns {Promise<false | Uint8Array>} The Uint8Array or false if an error occurred
 */
export const urlToUint8Array = async (
  context: Context,
  url: string
): Promise<false | Uint8Array> => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer"
    });
    return new Uint8Array(await response.data);
  } catch (error) {
    context.log.warn("urlToUint8Array: error - ", error);
    return false;
  }
};
