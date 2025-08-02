import React from "react";
import { Empty, Space } from "antd";
import { PictureOutlined } from "@ant-design/icons";

const EmptyState: React.FC = () => {
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", padding: "60px 0" }}
    >
      <Empty
        image={
          <PictureOutlined style={{ fontSize: "48px", color: "#d9d9d9" }} />
        }
        description={
          <span style={{ color: "#8c8c8c", fontSize: "14px" }}>
            输入 Iconfont JS 地址并点击加载按钮开始预览图标
          </span>
        }
        style={{
          backgroundColor: "#fafafa",
          borderRadius: "8px",
          margin: "24px 0",
        }}
      />
    </Space>
  );
};

export default EmptyState;
