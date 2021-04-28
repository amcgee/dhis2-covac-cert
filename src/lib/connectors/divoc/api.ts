import type { AxiosRequestConfig } from "axios";
import { createClient } from "../../utils/request";
import { divocConfig } from "../../utils/envConfig";

const Authorization = `Bearer ${divocConfig.token}`;

const client = createClient("divoc", {
  baseURL: divocConfig.baseUrl,
  headers: {
    Authorization,
  },
});

export const get = (apiPath: string, config?: AxiosRequestConfig) =>
  client.get(apiPath, config).then((response) => response.data);

export const post = (
  apiPath: string,
  data?: any,
  config?: AxiosRequestConfig
) =>
  client
    .post(apiPath, data, config)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response.data);
      throw err;
    });
