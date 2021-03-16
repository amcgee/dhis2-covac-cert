import fetch from "node-fetch";
import type { RequestInit } from "node-fetch";

export type RequestOptions = {
  params?: Record<string, string>;
  body?: any;
  authorization?: string;
};

const joinUrl = (...parts: string[]) => {
  const url = parts.join("/");
  const [scheme, rest] = url.split("://");
  return scheme + "://" + rest.replace(/\/+/g, "/");
};

const buildUri = (url, params: Record<string, string> = {}) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  if (!query.length) {
    return url;
  }
  return `${url}?${query}`;
};

export const requestRaw = async (
  urlParts: string[],
  options: RequestOptions = {},
  init: RequestInit = {}
) => {
  const body = !options.body
    ? undefined
    : typeof options.body === "string"
    ? options.body
    : JSON.stringify(options.body);
  const uri = buildUri(joinUrl(...urlParts), options.params);
  console.log(uri);
  const response = await fetch(uri, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: options.authorization,
    },
    body,
  });

  if (!response.ok) {
    console.error("Request failed", init, response);
    throw new Error("Request failed");
  }

  return response;
};

export const requestJSON = async (
  urlParts: string[],
  options: RequestOptions = {},
  init: RequestInit = {}
) => {
  const response = await requestRaw(urlParts, options, {
    ...init,
    headers: {
      ...init.headers,
      Accept: "application/json",
    },
  });
  return await response.json();
};
