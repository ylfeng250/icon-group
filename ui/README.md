# Iconfont 图标预览器

一个基于 React + TypeScript + Antd 的现代化 iconfont 图标预览工具。

## 功能特性

- 🎨 支持加载 Iconfont JS 资源
- 📱 响应式设计，支持移动端
- 🎯 扁平化 UI 设计，使用 Antd 组件
- 📋 点击图标获取 SVG 代码
- 🔄 支持切换不同的 iconfont 资源
- 📦 组件化设计，易于维护和扩展

## 项目结构

```
ui/
├── components/          # 组件目录
│   ├── IconGrid.tsx    # 图标网格组件
│   ├── IconModal.tsx   # 图标详情模态框
│   ├── UrlInput.tsx    # URL 输入组件
│   └── EmptyState.tsx  # 空状态组件
├── hooks/              # 自定义 Hooks
│   └── useIconfont.ts  # Iconfont 加载逻辑
├── types/              # 类型定义
│   └── index.ts        # 共享类型
├── App.tsx             # 主应用组件
├── App.css             # 样式文件
└── index.tsx           # 入口文件
```

## 使用方法

1. 输入 Iconfont JS 地址（如：`//at.alicdn.com/t/font_xxx.js`）
2. 点击"加载图标"按钮
3. 浏览加载的图标
4. 点击任意图标查看详情和获取 SVG 代码

## 技术栈

- React 17
- TypeScript
- Antd 5.x
- Vite

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev:ui

# 构建
npm run build:ui
``` 