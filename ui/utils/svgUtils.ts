import { IconItem } from "../types";

/**
 * 获取完整的 SVG 字符串（包含实际的路径数据）
 * @param icon IconItem 对象
 * @returns 完整的 SVG 字符串
 */
export const getFullSvgString = (icon: IconItem): string => {
  // 方法1：从 symbol 元素克隆内容
  const symbolElement = document.querySelector(`svg symbol#${icon.id}`);
  if (symbolElement) {
    const svgElement = document.createElement("svg");

    // 复制 symbol 的所有属性（除了 id）
    Array.from(symbolElement.attributes).forEach((attr) => {
      if (attr.name !== "id") {
        svgElement.setAttribute(attr.name, attr.value);
      }
    });

    // 复制 symbol 的所有子元素
    Array.from(symbolElement.children).forEach((child) => {
      svgElement.appendChild(child.cloneNode(true));
    });

    return svgElement.outerHTML;
  }

  // 方法2：如果找不到 symbol，尝试从 icon.element 获取
  if (icon.element) {
    const svgElement = document.createElement("svg");
    Array.from(icon.element.attributes).forEach((attr) => {
      if (attr.name !== "id") {
        svgElement.setAttribute(attr.name, attr.value);
      }
    });
    Array.from(icon.element.children).forEach((child) => {
      svgElement.appendChild(child.cloneNode(true));
    });
    return svgElement.outerHTML;
  }

  // 方法3：回退到 use 方式
  return getUseSvgString(icon);
};

/**
 * 获取 Use 引用的 SVG 字符串
 * @param icon IconItem 对象
 * @returns Use 引用的 SVG 字符串
 */
export const getUseSvgString = (icon: IconItem): string => {
  const svgElement = document.createElement("svg");
  const useElement = document.createElement("use");
  useElement.setAttribute("xlink:href", `#${icon.id}`);
  svgElement.appendChild(useElement);
  return svgElement.outerHTML;
};

/**
 * 获取带样式的完整 SVG 字符串
 * @param icon IconItem 对象
 * @param style 样式对象
 * @returns 带样式的完整 SVG 字符串
 */
export const getStyledSvgString = (
  icon: IconItem,
  style: Record<string, string> = {
    width: "32px",
    height: "32px",
    fill: "rgb(61, 61, 61)",
  }
): string => {
  const fullSvg = getFullSvgString(icon);
  const styleString = Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");

  return fullSvg.replace("<svg", `<svg style="${styleString}"`);
};

/**
 * 获取所有可用的 SVG 代码格式
 * @param icon IconItem 对象
 * @returns 包含不同格式 SVG 代码的对象
 */
export const getAllSvgFormats = (icon: IconItem) => {
  return {
    full: getFullSvgString(icon),
    use: getUseSvgString(icon),
    styled: getStyledSvgString(icon),
    styledCustom: getStyledSvgString(icon, {
      width: "48px",
      height: "48px",
      fill: "#3D3D3D",
    }),
  };
};

/**
 * 从 DOM 中直接获取 SVG 元素的完整字符串
 * @param selector SVG 元素的选择器
 * @returns SVG 字符串
 */
export const getSvgFromDOM = (selector: string): string => {
  const element = document.querySelector(selector);
  if (element && element.tagName.toLowerCase() === "svg") {
    return element.outerHTML;
  }
  return "";
};

/**
 * 将 SVG 字符串转换为可用的 DOM 元素
 * @param svgString SVG 字符串
 * @returns SVG 元素
 */
export const createSvgElement = (svgString: string): SVGElement | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = doc.querySelector("svg");
  return svgElement;
};

// 全局函数，方便在浏览器控制台中使用
if (typeof window !== "undefined") {
  (window as any).getFullSvgString = getFullSvgString;
  (window as any).getUseSvgString = getUseSvgString;
  (window as any).getStyledSvgString = getStyledSvgString;
  (window as any).getAllSvgFormats = getAllSvgFormats;
  (window as any).getSvgFromDOM = getSvgFromDOM;
}
