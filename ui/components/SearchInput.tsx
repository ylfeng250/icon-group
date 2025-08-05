import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "搜索图标...",
  disabled = false,
}) => {
  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      allowClear
      style={{ width: "100%" }}
    />
  );
};

export default SearchInput;
