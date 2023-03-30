import { Interval } from "limiter";

export const NODE_ENV: string = process.env.NODE_ENV || "development";

export const ORIGIN: string = process.env.ORIGIN || "";

export const IMAGE_DEFAULTS = {
  format: "webp",
  quality: 50
};

export const LIMITER_TOKENS = parseInt(process.env.LIMITER_TOKENS) || 150;
export const LIMITER_INTERVAL: Interval = parseInt(process.env.LIMITER_INTERVAL) || "hour";
