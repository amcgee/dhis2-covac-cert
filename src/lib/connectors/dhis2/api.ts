import type { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { Stream } from "node:stream";
import { createClient, joinUrl } from "../../utils/request";

const baseUrl = process.env.DHIS2_BASE_URL || "https://interop.dhis2.org/covac";
const apiVersion = process.env.DHIS2_API_VERSION || 35;
const username = process.env.DHIS2_USERNAME || "";
const password = process.env.DHIS2_PASSWORD || "";

const client = createClient("dhis2", {
  baseURL: baseUrl,
  auth: {
    username,
    password,
  },
});

export const uploadFile = (fileStream: Stream, config?: AxiosRequestConfig) => {
  const formData = new FormData();
  formData.append("file", fileStream, "certificate.pdf");

  return client
    .post(joinUrl("api", String(apiVersion), "fileResources"), formData, {
      ...config,
      headers: { ...config?.headers, ...formData.getHeaders() },
    })
    .then((response) => response.data);
};
export const get = (apiPath: string, config?: AxiosRequestConfig) =>
  client
    .get(joinUrl("api", String(apiVersion), apiPath), config)
    .then((response) => response.data);

export const post = (
  apiPath: string,
  data?: any,
  config?: AxiosRequestConfig
) =>
  client
    .post(joinUrl("api", String(apiVersion), apiPath), data, config)
    .then((response) => response.data);
