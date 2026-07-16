import { hc } from "hono/client";
import type { AppType } from "../../api/index";
import { getToken } from "./auth";

const client = hc<AppType>("/", {
  headers: (): Record<string, string> => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});

export const api = client.api;
