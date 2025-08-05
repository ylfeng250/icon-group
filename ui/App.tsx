import React, { useState } from "react";
import { Layout, Typography, Card, Space, Flex, Switch } from "antd";
import "./App.css";

import UrlInput from "./components/UrlInput";
import SearchInput from "./components/SearchInput";
import IconGrid from "./components/IconGrid";
import IconModal from "./components/IconModal";
import EmptyState from "./components/EmptyState";
import SvgPreviewSettings from "./components/SvgPreviewSettings";
import { useIconfont } from "./hooks/useIconfont";
import { IconItem } from "./types";
import { api } from "@lib/api";
import { getStyledSvgString } from "./utils/svgUtils";
import { SvgPreviewSettings as SvgPreviewSettingsType } from "./components/SvgPreviewSettings";

const { Header, Content } = Layout;
const { Text } = Typography;

function App() {
  const {
    url,
    setUrl,
    icons,
    filteredIcons,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    loadIcons,
  } = useIconfont();
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [previewSettings, setPreviewSettings] =
    useState<SvgPreviewSettingsType>({
      size: 16,
      color: "#3D3D3D",
    });

  const handleIconClick = async (icon: IconItem) => {
    setSelectedIcon(icon);
    // 调试模式在才允许打开图标预览
    if (debugMode) {
      setShowModal(true);
    } else {
      // 直接插入代码
      const svgString = getStyledSvgString(icon);
      await api.createIcon(icon.id, svgString);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedIcon(null);
  };

  return (
    <Flex vertical gap={5} style={{ padding: 8 }}>
      <Flex vertical>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          本插件仅提供图标加载功能，如拿三方作者 iconfont 资源用于商用,请至
          <a href="https://www.iconfont.cn/" target="_blank">
            iconfont
          </a>
          官网咨询作者授权
        </Text>

        {icons.length > 0 && (
          <Flex gap={5}>
            <Flex gap={5}>
              <span>图标统计</span>
              <span>
                {filteredIcons.length} / {icons.length} 个图标
              </span>
            </Flex>

            <Space>
              <Switch
                size="small"
                checked={debugMode}
                onChange={(checked: boolean) => setDebugMode(checked)}
                checkedChildren="开启调试"
                unCheckedChildren="关闭调试"
              />
            </Space>
          </Flex>
        )}
      </Flex>

      <Flex gap={5}>
        <Flex vertical gap={5} style={{ width: "100%", padding: 4 }}>
          <Card>
            <UrlInput
              url={url}
              loading={loading}
              error={error}
              onUrlChange={setUrl}
              onLoad={() => loadIcons(url)}
            />
          </Card>

          {icons.length > 0 && (
            <Flex vertical gap={5}>
              <SearchInput
                value={searchKeyword}
                onChange={setSearchKeyword}
                placeholder="搜索图标名称..."
                disabled={loading}
              />
              <Flex gap={20} style={{ width: "100%" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <IconGrid
                    icons={filteredIcons}
                    onIconClick={handleIconClick}
                    previewSettings={previewSettings}
                  />
                </div>
              </Flex>
            </Flex>
          )}

          {icons.length === 0 && !loading && !error && <EmptyState />}
        </Flex>
        <SvgPreviewSettings
          settings={previewSettings}
          onSettingsChange={setPreviewSettings}
        />
      </Flex>

      <IconModal
        visible={showModal}
        icon={selectedIcon}
        onClose={handleModalClose}
        previewSettings={previewSettings}
      />
    </Flex>
  );
}

export default App;
