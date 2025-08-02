import React from "react";
import { Modal, Button, Typography, Space, message } from "antd";
import { CopyOutlined, CloseOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

import { IconItem } from "../types";

interface IconModalProps {
  visible: boolean;
  icon: IconItem | null;
  onClose: () => void;
}

const IconModal: React.FC<IconModalProps> = ({ visible, icon, onClose }) => {
  const getSvgCode = (icon: IconItem) => {
    const svgElement = document.createElement("svg");
    const useElement = document.createElement("use");
    useElement.setAttribute("xlink:href", `#${icon.id}`);
    svgElement.appendChild(useElement);
    return svgElement.outerHTML;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("SVG 代码已复制到剪贴板");
    } catch (err) {
      message.error("复制失败，请手动复制");
    }
  };

  if (!icon) return null;

  const svgCode = getSvgCode(icon);

  return (
    <Modal
      title={
        <Space>
          <span>图标详情</span>
          <Text type="secondary" style={{ fontSize: "14px" }}>
            {icon.id}
          </Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      destroyOnClose
      style={{ top: 20 }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div
          style={{
            textAlign: "center",
            padding: "24px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
          }}
        >
          <svg
            style={{
              width: "48px",
              height: "48px",
              fill: "#3D3D3D",
              marginBottom: "12px",
            }}
          >
            <use xlinkHref={`#${icon.id}`} />
          </svg>
          <div style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>
            {icon.id}
          </div>
        </div>

        <div>
          <Space
            style={{
              width: "100%",
              marginBottom: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong>SVG 代码</Text>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyToClipboard(svgCode)}
            >
              复制代码
            </Button>
          </Space>
          <div
            style={{
              backgroundColor: "#f6f8fa",
              border: "1px solid #e1e4e8",
              borderRadius: "6px",
              padding: "12px",
              position: "relative",
            }}
          >
            <Paragraph
              style={{
                margin: 0,
                fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
                fontSize: "12px",
                lineHeight: "1.5",
                color: "#24292e",
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                maxHeight: "150px",
                overflow: "auto",
              }}
              copyable={{
                text: svgCode,
                tooltips: ["复制代码", "复制成功"],
              }}
            >
              {svgCode}
            </Paragraph>
          </div>
        </div>
      </Space>
    </Modal>
  );
};

export default IconModal;
