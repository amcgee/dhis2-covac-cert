import fetch from "node-fetch";
import type { RequestInit } from "node-fetch";
import {
  requestJSON as doRequestJSON,
  requestRaw as doRequestRaw,
  RequestOptions,
} from "../../utils/request";

export const baseUrl = process.env.DIVOC_BASE_URL || "http://52.172.216.52";
const token =
  process.env.DIVOC_TOKEN ||
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwaUx1Q0JmYzF5OXotelFKVGFmaDExd0daQ3M5bU5oeVRINU1zamh3WDVzIn0.eyJleHAiOjE2Mjk2MzYxODYsImlhdCI6MTYxMjM1NjE4NiwianRpIjoiYTU2OTI0NjItMzkwOS00NTY5LWI5MmMtNTUyNmJlZmJlMWQxIiwiaXNzIjoiaHR0cDovLzUyLjE3Mi4yMTYuNTIvYXV0aC9yZWFsbXMvZGl2b2MiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiLCJmYWNpbGl0eS1hZG1pbi1wb3J0YWwiXSwic3ViIjoiZDllNjhiZTQtMjA1YS00YjQ0LTgzMDEtMWZlYTI1NTdmMWNmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjhlMjY4YzEzLTZmMWYtNGNlNi1iMzkzLTM2MWE3ZGY3ZTlhYSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9kaXZvYy54aXYuaW4iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyJdfSwiYWRtaW4tYXBpIjp7InJvbGVzIjpbImFwaSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19LCJmYWNpbGl0eS1hZG1pbi1wb3J0YWwiOnsicm9sZXMiOlsiZmFjaWxpdHktc3RhZmYiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImFkbWluLWFwaSIsImNsaWVudEhvc3QiOiIxNzIuMjUuMC4xNCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWFkbWluLWFwaSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMjUuMC4xNCJ9.THk3T7HTI6WJ4L7qme-QeMQexAn-3UBaxH-wPciZ68pddXi1-hPQ8VDCdJQ9HKRWGHBm4OCAI_W5HyN286mWqo-dFU3S2EUnSTCFi6_6uUi4dkxgiMDyEXLqsm1SKUMmhtUUDd2TBBLJ4I8qZOrcMQNJ-p5EUG6rthMCjBjonAaXAPraSP9vRnzoRzmahelJY8meP8G7shPTT-UWzGypy1dOrkyoQcf8nJwfnq386tb8inr94Gc9l1DqOk20b0VgLq9ZfDrP0svAIwPOlKURHIuekN6FcEzN78_ZbmfEU7__z8ZrSqYIGLdRRQaG7--yhpIDSLFSX0K7AFzNzD-nrQ";

const authorization = `Bearer ${token}`;

export const requestRaw = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  doRequestRaw(
    [baseUrl, apiPath],
    {
      ...options,
      authorization,
    },
    init
  );

export const requestJSON = (
  apiPath: string,
  options: RequestOptions,
  init?: RequestInit
) =>
  doRequestJSON(
    [baseUrl, apiPath],
    {
      ...options,
      authorization,
    },
    init
  );

export const get = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  requestJSON(apiPath, options, {
    method: "GET",
    ...init,
  });

export const post = (
  apiPath: string,
  options?: RequestOptions,
  init?: RequestInit
) =>
  requestJSON(apiPath, options, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
