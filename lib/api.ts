import { createPluginAPI, createUIAPI } from "mg-jsonrpc";

export const api = createPluginAPI({
  setToken(token: string) {
    return mg.clientStorage.setAsync("token", token);
  },
  getToken() {
    return mg.clientStorage.getAsync("token");
  },
});

export const uiApi = createUIAPI({
  ping() {
    return "pong";
  },
});
