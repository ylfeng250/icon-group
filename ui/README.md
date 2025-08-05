# Iconfont Plugin UI

这是一个用于加载和预览 Iconfont 图标的插件界面。

## 功能特性

- 加载 Iconfont JS 文件
- 预览图标网格
- 获取完整的 SVG 代码
- 支持多种 SVG 格式

## SVG 代码获取

### 1. 完整 SVG 代码（推荐）

获取包含实际路径数据的完整 SVG 字符串：

```javascript
// 在控制台中使用
const icon = icons[0]; // 获取第一个图标
const fullSvg = getFullSvgString(icon);
console.log(fullSvg);
```

输出示例：
```html
<svg viewBox="0 0 1024 1024">
  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
</svg>
```

### 2. Use 引用代码

获取使用 `<use>` 标签的 SVG 代码：

```javascript
const useSvg = getUseSvgString(icon);
console.log(useSvg);
```

输出示例：
```html
<svg>
  <use xlink:href="#icon-fanhui"></use>
</svg>
```

### 3. 带样式的完整代码

获取包含样式的完整 SVG 代码：

```javascript
const styledSvg = getStyledSvgString(icon, {
  width: "32px",
  height: "32px",
  fill: "rgb(61, 61, 61)"
});
console.log(styledSvg);
```

输出示例：
```html
<svg viewBox="0 0 1024 1024" style="width: 32px; height: 32px; fill: rgb(61, 61, 61);">
  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
</svg>
```

### 4. 获取所有格式

一次性获取所有可用的 SVG 格式：

```javascript
const allFormats = getAllSvgFormats(icon);
console.log(allFormats);
// 输出：
// {
//   full: "<svg viewBox=...>...</svg>",
//   use: "<svg><use xlink:href=...></svg>",
//   styled: "<svg style=...>...</svg>",
//   styledCustom: "<svg style=...>...</svg>"
// }
```

## 在 DOM 中直接获取 SVG

你也可以直接从 DOM 中获取 SVG 元素：

```javascript
// 获取页面中第一个 SVG 元素的完整代码
const svgFromDOM = getSvgFromDOM('svg');
console.log(svgFromDOM);

// 获取特定选择器的 SVG
const specificSvg = getSvgFromDOM('.my-svg-class');
console.log(specificSvg);
```

## 使用场景

1. **完整 SVG 代码**：适用于需要独立使用的图标，不依赖外部 symbol 定义
2. **Use 引用代码**：适用于在同一个页面中有 symbol 定义的情况
3. **带样式的代码**：适用于需要特定样式的场景
4. **DOM 获取**：适用于从现有页面元素中提取 SVG 代码

## 注意事项

- 完整 SVG 代码包含实际的路径数据，文件较大但可独立使用
- Use 引用代码文件小，但需要确保 symbol 定义存在
- 样式可以通过 CSS 类或内联样式设置
- 所有函数都支持在浏览器控制台中直接使用 