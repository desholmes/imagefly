# ImageFLY

![ImageFly](./docs/image-fly.png)

An [Azure Function App](https://docs.microsoft.com/en-us/azure/azure-functions/) for on-the-fly image transformations.

## Usage

### GET: /api/v1/image/{imagePath}

* Transforms and image based on the `ORIGIN` environment variable and the `imagePath` route parameter
* Query Params:
  * `format`: `string`: The format of the image. Defaults to `webp`
  * `quality`: `number`: The quality of the image. Defaults to `50`

**Returns:** A transformed image, or a 404 if the image is not found.

### GET: /api/v1/health-check

* Health check route
* **Request URL** GET: `/api/v1/health-check`

Used by monitoring to check system health.

**Example response**:

```json
{
  "error": false,
  "message": "Service is available"
}
```

---

## Development

### Prerequisites

1. An installation of [Node.js v18.12.1 (npm v8.19.2)](https://nodejs.org/en/download/)
2. An installation of [Azure Functions Core Tools v4](https://www.npmjs.com/package/azure-functions-core-tools)
3. An installation of [VSCode](https://code.visualstudio.com/download) with the following extensions:
   1. [Spelling Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
   2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. A working knowledge of:
   1. [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started?pivots=programming-language-csharp) (and the [VsCode extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) is installed)
   2. [Node.js](https://nodejs.org/en/)
   3. [TypeScript](https://www.typescriptlang.org/)

### Getting Started

1. Review and complete the `Prerequisites` above
2. Copy [./local.settings-template.json](./local.settings-template.json) to `./local.settings.json` and replace the required environment variables
3. `npm i`: Install dependencies
4. `npm run start:dev`: Start the local DEV environment
5. Press `CTRL+c` to stop the local DEV environment

### Environment Variables

| Name| Description|
| --- | --- |
| `ORIGIN` | `string`: The origin of the image source. |
| `AzureWebJobs.v1HeathCheck.Disabled` | `boolean`: To disable the `v1HeathCheck` function  |
| `AzureWebJobs.v1Image.Disabled` | `boolean`: To disable the `v1Document` function |

## Commands

|Command|Description|
|---|---|
|`npm start`|Starts the Function App in Azure `func start`|
|`npm start:dev`|Starts a local dev environment by running `npm start` and `npm run watch` concurrently|
|`npm run build`|Create a build `tsc`|
|`npm run watch`|Watch and create a build `tsc tsc -w`|
|`npm run audit`|Runs `npm audit --production --audit-level=critical` to check for known vulnerabilities|
|`npm run lint`|Run eslint `eslint --max-warnings=0 --ext=ts,json ./`|
|`npm run lint:fix`|Run eslint with fix arg `eslint --max-warnings=0 --fix --ext=ts,json ./`|
