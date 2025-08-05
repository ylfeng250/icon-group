import React from "react";
import { Tooltip, Flex } from "antd";

import { IconItem } from "../types";
import { SvgPreviewSettings } from "./SvgPreviewSettings";

interface IconGridProps {
  icons: IconItem[];
  onIconClick: (icon: IconItem) => void;
  previewSettings: SvgPreviewSettings;
}

const IconGrid: React.FC<IconGridProps> = ({
  icons,
  onIconClick,
  previewSettings,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <Flex
        wrap
        gap={12}
        justify="start"
        align="center"
        style={{ width: "100%" }}
      >
        {icons.map((icon) => (
          <Tooltip key={icon.id} title={`点击插入 ${icon.id} 图标`}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid #f0f0f0",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.borderColor = "#d9d9d9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fafafa";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
              onClick={() => onIconClick(icon)}
            >
              <svg
                style={{
                  width: `${previewSettings.size}px`,
                  height: `${previewSettings.size}px`,
                  fill: previewSettings.color,
                  stroke: previewSettings.color,
                  marginBottom: "4px",
                }}
              >
                <use xlinkHref={`#${icon.id}`} />
              </svg>
              <div
                style={{
                  fontSize: "10px",
                  color: "#8c8c8c",
                  textAlign: "center",
                  lineHeight: "1.2",
                  maxWidth: "50px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {icon.id}
              </div>
            </div>
          </Tooltip>
        ))}
      </Flex>
    </div>
  );
};

export default IconGrid;
