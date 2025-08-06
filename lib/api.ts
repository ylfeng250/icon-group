import { createPluginAPI, createUIAPI } from "mg-jsonrpc";

export const api = createPluginAPI({
  async createIcon(
    name: string,
    svgString: string,
    options: {
      size: number;
      color: string;
    }
  ) {
    const node = await mg.createNodeFromSvgAsync(svgString);
    node.name = name;
    node.width = options.size;
    node.height = options.size;
    mg.viewport.scrollAndZoomIntoView([node]);
    return node;
  },
  async setClientStorage(key: string, value: string) {
    await mg.clientStorage.setAsync(key, value);
  },
  async getClientStorage(key: string) {
    return await mg.clientStorage.getAsync(key);
  },
});

export const uiApi = createUIAPI({
  ping() {
    return "pong";
  },
});
