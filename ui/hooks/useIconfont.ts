import { useState, useRef, useMemo } from "react";
import { IconItem } from "../types";

export const useIconfont = () => {
  const [url, setUrl] = useState("//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js");
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // 根据搜索关键词过滤图标
  const filteredIcons = useMemo(() => {
    if (!searchKeyword.trim()) {
      return icons;
    }

    const keyword = searchKeyword.toLowerCase();
    return icons.filter((icon) => icon.id.toLowerCase().includes(keyword));
  }, [icons, searchKeyword]);

  const loadIcons = async (iconfontUrl: string) => {
    if (!iconfontUrl.trim()) {
      setError("请输入有效的 Iconfont JS 地址");
      return;
    }

    setLoading(true);
    setError("");
    setIcons([]);
    setSearchKeyword(""); // 清空搜索关键词

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
    filteredIcons,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    loadIcons,
  };
};
