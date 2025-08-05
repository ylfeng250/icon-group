import { createPluginAPI, createUIAPI } from "mg-jsonrpc";

export const api = createPluginAPI({
  async createIcon(name: string, svgString: string) {
    const node = await mg.createNodeFromSvgAsync(svgString);
    node.name = name;
    return node;
  },
});

export const uiApi = createUIAPI({
  ping() {
    return "pong";
  },
});
