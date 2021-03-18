import type { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { Stream } from "node:stream";
import { createClient, joinUrl } from "../../utils/request";
import { dhis2config } from "../../utils/envConfig";

const client = createClient("dhis2", {
  baseURL: dhis2config.baseUrl,
  auth: {
    username: dhis2config.username,
    password: dhis2config.password,
  },
});

export const uploadFile = (fileStream: Stream, config?: AxiosRequestConfig) => {
  const formData = new FormData();
  formData.append("file", fileStream, "certificate.pdf");

  return client
    .post(
      joinUrl("api", String(dhis2config.apiVersion), "fileResources"),
      formData,
      {
        ...config,
        headers: { ...config?.headers, ...formData.getHeaders() },
      }
    )
    .then((response) => response.data);
};
export const get = (apiPath: string, config?: AxiosRequestConfig) =>
  client
    .get(joinUrl("api", String(dhis2config.apiVersion), apiPath), config)
    .then((response) => response.data);

export const post = (
  apiPath: string,
  data?: any,
  config?: AxiosRequestConfig
) =>
  client
    .post(joinUrl("api", String(dhis2config.apiVersion), apiPath), data, config)
    .then((response) => response.data);
