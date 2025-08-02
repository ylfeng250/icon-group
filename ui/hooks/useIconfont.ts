import { useState, useRef } from "react";
import { IconItem } from "../types";

export const useIconfont = () => {
  const [url, setUrl] = useState("//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js");
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const loadIcons = async (iconfontUrl: string) => {
    if (!iconfontUrl.trim()) {
      setError("请输入有效的 Iconfont JS 地址");
      return;
    }

    setLoading(true);
    setError("");
    setIcons([]);

    try {
      // 移除之前的脚本
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }

      // 创建新的脚本元素
      const script = document.createElement("script");
      script.id = "iconfont-script";
      script.src = iconfontUrl.startsWith("http")
        ? iconfontUrl
        : "https:" + iconfontUrl;
      scriptRef.current = script;

      // 等待脚本加载完成
      await new Promise<void>((resolve, reject) => {
        script.onload = () => {
          setTimeout(() => {
            const symbols = Array.from(document.querySelectorAll("svg symbol"));
            const iconItems: IconItem[] = symbols.map((sym) => ({
              id: sym.getAttribute("id") || "",
              element: sym as SVGElement,
            }));
            setIcons(iconItems);
            resolve();
          }, 100);
        };
        script.onerror = () => reject(new Error("脚本加载失败"));
        document.head.appendChild(script);
      });
    } catch (err) {
      setError("加载失败，请检查 URL 是否正确");
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    icons,
    loading,
    error,
    loadIcons,
  };
};
