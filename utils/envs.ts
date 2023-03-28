const requiredEnvironmentVariables = ["ORIGIN"];

/**
 * Checks if all required environment variables are set
 * @returns {true | string} True if all required environment variables are set, otherwise a string of missing environment variables
 */
export const areEnvironmentVariablesSet = (): true | string => {
  const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (variable) => !process.env[variable]
  );
  return missingEnvironmentVariables.length === 0 ? true : missingEnvironmentVariables.join(", ");
};

/**
 * Get the document search keys from the environment variable
 * @param {string} envKey - The environment variable key
 * @param {Array<string>} defaults - The default search keys
 * @returns {Array<string>} The search keys
 */
export const envCsvToArray = (envKey: string, defaults: Array<string>): Array<string> => {
  const keys = process.env[envKey];
  if (keys) {
    return keys.replace(", ", ",").split(",");
  }
  console.warn(`No ${envKey} environment variable found, using defaults: ${defaults}`);
  return defaults;
};
