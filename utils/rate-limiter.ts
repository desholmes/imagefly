import { Context } from "@azure/functions";
import { RateLimiter } from "limiter";

import { LIMITER_TOKENS, LIMITER_INTERVAL } from "../constants";
import { HttpStatusCode } from "./http-codes";

const functionName = "utils rateLimitExceeded";

const limiter = new RateLimiter({
  tokensPerInterval: LIMITER_TOKENS,
  interval: LIMITER_INTERVAL
});

console.log("Rate limiter set to:", LIMITER_TOKENS, LIMITER_INTERVAL);

export const rateLimitExceeded = async (context: Context): Promise<boolean> => {
  if (limiter.getTokensRemaining() < 1) {
    context.log.warn(`${functionName}: Rate limit exceeded`);
    context.res.status = HttpStatusCode.TOO_MANY_REQUESTS;
    return true;
  }
  await limiter.removeTokens(1);
  return false;
};
