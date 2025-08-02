import React from "react";
import { Input, Button, Alert, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface UrlInputProps {
  url: string;
  loading: boolean;
  error: string;
  onUrlChange: (url: string) => void;
  onLoad: () => void;
}

const UrlInput: React.FC<UrlInputProps> = ({
  url,
  loading,
  error,
  onUrlChange,
  onLoad,
}) => {
  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="粘入 JS 地址，比如 //at.alicdn.com/t/font_xxx.js"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          onPressEnter={onLoad}
          size="small"
          style={{ flex: 1 }}
        />
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          loading={loading}
          onClick={onLoad}
          size="small"
        >
          {loading ? "加载中..." : "加载图标"}
        </Button>
      </Space.Compact>

      {error && <Alert message={error} type="error" showIcon />}
    </Space>
  );
};

export default UrlInput;
