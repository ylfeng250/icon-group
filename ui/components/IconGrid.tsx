import React from "react";
import { Card, Tooltip, Flex } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { IconItem } from "../types";

interface IconGridProps {
  icons: IconItem[];
  onIconClick: (icon: IconItem) => void;
}

const IconGrid: React.FC<IconGridProps> = ({ icons, onIconClick }) => {
  return (
    <Flex wrap gap="small" style={{ padding: "16px" }}>
      {icons.map((icon) => (
        <Tooltip key={icon.id} title={`点击查看 ${icon.id} 的 SVG 代码`}>
          <div
            style={{
              width: "80px",
              height: "80px",
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
                width: "32px",
                height: "32px",
                fill: "#3D3D3D",
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
                maxWidth: "70px",
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
  );
};

export default IconGrid;
