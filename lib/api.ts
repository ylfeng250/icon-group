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
    node.fills = [{ type: "SOLID", color: mg.hexToRGBA(options.color) }];
    return node;
  },
});

export const uiApi = createUIAPI({
  ping() {
    return "pong";
  },
});
