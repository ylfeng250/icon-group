import React, { useState } from "react";
import { Layout, Typography, Card, Space, Flex } from "antd";
import "./App.css";

import UrlInput from "./components/UrlInput";
import IconGrid from "./components/IconGrid";
import IconModal from "./components/IconModal";
import EmptyState from "./components/EmptyState";
import { useIconfont } from "./hooks/useIconfont";
import { IconItem } from "./types";

const { Header, Content } = Layout;
const { Text } = Typography;

function App() {
  const { url, setUrl, icons, loading, error, loadIcons } = useIconfont();
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = (icon: IconItem) => {
    setSelectedIcon(icon);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedIcon(null);
  };

  return (
    <Flex vertical gap={10} style={{ padding: 8 }}>
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
            <span>图标统计</span>
            <span>{icons.length} 个图标</span>
          </Flex>
        )}
      </Flex>

      <Flex vertical gap={10} style={{ width: "100%" }}>
        <Card>
          <UrlInput
            url={url}
            loading={loading}
            error={error}
            onUrlChange={setUrl}
            onLoad={() => loadIcons(url)}
          />
        </Card>

        {icons.length > 0 ? (
          <Card bodyStyle={{ padding: "24px" }}>
            <IconGrid icons={icons} onIconClick={handleIconClick} />
          </Card>
        ) : !loading && !error ? (
          <EmptyState />
        ) : null}
      </Flex>

      <IconModal
        visible={showModal}
        icon={selectedIcon}
        onClose={handleModalClose}
      />
    </Flex>
  );
}

export default App;
