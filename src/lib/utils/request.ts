import axios, { AxiosRequestConfig } from "axios";
import * as AxiosLogger from "axios-logger";

export const createClient = (name, axiosConfig: AxiosRequestConfig) => {
  const client = axios.create(axiosConfig);
  client.interceptors.request.use((request) => {
    const contentTypeHeaderKey = Object.keys(request.headers).find(
      (key) => key.toLowerCase() === "content-type"
    );
    return AxiosLogger.requestLogger(request, {
      prefixText: name,
      headers: true,
      data:
        !!contentTypeHeaderKey &&
        request.headers[contentTypeHeaderKey].toLowerCase() ===
          "application/json",
    });
  });
  client.interceptors.response.use((response) => {
    const contentTypeHeaderKey = Object.keys(response.headers).find(
      (key) => key.toLowerCase() === "content-type"
    );
    return AxiosLogger.responseLogger(response, {
      prefixText: name,
      headers: true,
      data:
        !!contentTypeHeaderKey &&
        response.headers[contentTypeHeaderKey].toLowerCase() ===
          "application/json",
    });
  });
  return client;
};

export const joinUrl = (...parts: string[]) => {
  const url = parts.join("/");
  const [scheme, rest] = url.split("://");
  return rest
    ? scheme + "://" + rest.replace(/\/+/g, "/")
    : scheme.replace(/\/+/g, "/");
};
