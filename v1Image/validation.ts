import * as Joi from "joi";
import { IMAGE_DEFAULTS } from "../constants";

export const imageQueryParamsValidator = Joi.object({
  format: Joi.string().optional().valid("png", "jpeg", "webp").default(IMAGE_DEFAULTS.format),
  quality: Joi.number().optional().min(1).max(100).default(IMAGE_DEFAULTS.quality)
});
