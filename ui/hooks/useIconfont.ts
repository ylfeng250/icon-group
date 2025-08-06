import { useState, useRef, useMemo, useEffect } from "react";
import { IconItem } from "../types";
import { api } from "@lib/api";

const STORAGE_KEY = "iconfont-url";
const DEFAULT_URL = "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js";

export const useIconfont = () => {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // 组件初始化时从存储中恢复 URL
  useEffect(() => {
    const restoreUrl = async () => {
      try {
        const savedUrl = await api.getClientStorage(STORAGE_KEY);
        if (savedUrl && savedUrl !== DEFAULT_URL) {
          setUrl(savedUrl);
          // 自动加载保存的图标
          await loadIcons(savedUrl);
        }
      } catch (error) {
        console.warn("Failed to restore saved URL:", error);
      }
    };

    restoreUrl();
  }, []);

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
      // 存储 URL 到客户端存储
      await api.setClientStorage(STORAGE_KEY, iconfontUrl);

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
