import React, { useState } from "react";
import { Card, Space, Typography, Flex, Select, Popover } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";

const { Text } = Typography;

export interface SvgPreviewSettings {
  size: number;
  color: string;
}

interface SvgPreviewSettingsProps {
  settings: SvgPreviewSettings;
  onSettingsChange: (settings: SvgPreviewSettings) => void;
}

const SvgPreviewSettings: React.FC<SvgPreviewSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const handleSizeChange = (value: number) => {
    onSettingsChange({ ...settings, size: value });
  };

  // 生成尺寸选项
  const sizeOptions = Array.from({ length: 21 }, (_, i) => ({
    label: `${12 + i}px`,
    value: 12 + i,
  }));

  const handleColorChange = (color: any) => {
    onSettingsChange({ ...settings, color: color.hex });
  };

  return (
    <Card
      size="small"
      title={
        <Space>
          <EyeOutlined />
          <span>预览设置</span>
        </Space>
      }
      style={{
        height: "fit-content",
        position: "sticky",
        top: "16px",
      }}
    >
      <Flex vertical gap="middle" style={{ width: 140 }}>
        <div>
          <Space style={{ marginBottom: 8 }}>
            <Text type="secondary">尺寸</Text>
            <Select
              value={settings.size}
              onChange={handleSizeChange}
              options={sizeOptions}
              style={{ width: 80 }}
              size="small"
            />
          </Space>
        </div>

        <div>
          <Space style={{ marginBottom: 8 }}>
            <Text type="secondary">颜色</Text>
            <Popover
              content={
                <SketchPicker
                  color={settings.color}
                  onChange={handleColorChange}
                  disableAlpha={true}
                />
              }
              trigger="click"
              open={colorPickerVisible}
              onOpenChange={setColorPickerVisible}
              placement="left"
            >
              <div
                style={{
                  width: 32,
                  height: 24,
                  borderRadius: 4,
                  border: "1px solid #d9d9d9",
                  backgroundColor: settings.color,
                  cursor: "pointer",
                }}
              />
            </Popover>
          </Space>
        </div>
      </Flex>
    </Card>
  );
};

export default SvgPreviewSettings;
