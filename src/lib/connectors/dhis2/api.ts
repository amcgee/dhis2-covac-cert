import type { RequestInit } from "node-fetch";

import {
  requestJSON as doRequestJSON,
  requestRaw as doRequestRaw,
  RequestOptions,
} from "../../utils/request";

const baseUrl = process.env.DHIS2_BASE_URL || "https://interop.dhis2.org/covac";
const apiVersion = process.env.DHIS2_API_VERSION || 35;
const username = process.env.DHIS2_USERNAME;
const password = process.env.DHIS2_PASSWORD;

const authToken = Buffer.from(`${username}:${password}`).toString("base64");
const authorization = `Basic ${authToken}`;

const requestRaw = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  doRequestRaw(
    [baseUrl, "api", String(apiVersion), apiPath],
    {
      ...options,
      authorization,
    },
    init
  );

const request = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  doRequestJSON(
    [baseUrl, "api", String(apiVersion), apiPath],
    {
      ...options,
      authorization,
    },
    init
  );

export const uploadFile = (fileStream) => {
  //   const formData = new FormData();
  // formData.append('file', fileStream);
  return request(
    "fileResources",
    {
      body: fileStream,
    },
    {
      method: "POST",
    }
  );
};
export const get = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  request(apiPath, options, {
    method: "GET",
    ...init,
  });

export const post = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  request(apiPath, options, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
