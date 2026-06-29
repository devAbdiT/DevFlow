import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 100000,
    headers: customeHeaders = {},
    ...restOptions
  } = options;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const headers: HeadersInit = { ...defaultHeaders, ...customeHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      // Checks for HTTP success (200-299)
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url}:${error.message}`);
    } else {
      logger.error(`Error fetching ${url}:${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
