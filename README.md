# Markdown to Card

将 Markdown 转换为精美卡片的在线工具。

## ✨ 功能特点

- 📝 **完整的 Markdown 支持** - 标题、列表、代码块、表格、引用等
- 🎨 **24种主题样式** - 苹果备忘录、Instagram、赛博朋克、中国传统等
- 📄 **分页功能** - 使用 `---` 分隔符创建多页卡片
- 🖼️ **导出 PNG** - 支持导出当前页或全部页（ZIP打包）
- 💻 **代码高亮** - 支持多种编程语言的语法高亮
- 📊 **表格支持** - 完整的表格渲染
- 📋 **复制到剪贴板** - 一键复制图片

## 🚀 在线演示

[点击访问](https://vivienzhou66-web.github.io/markdown-to-card/)

## 📦 本地运行

```bash
# 克隆项目
git clone https://github.com/vivienzhou66-web/markdown-to-card.git

# 进入项目目录
cd markdown-to-card

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🔧 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📖 使用方法

1. **编辑内容** - 在左侧编辑器输入 Markdown 内容
2. **选择主题** - 点击顶部主题选择器切换样式
3. **分页** - 使用工具栏的分页符按钮或输入 `---` 创建新页面
4. **页码位置** - 在顶部设置页码显示位置（左下角/中间/右下角）
5. **导出** - 点击导出按钮选择导出当前页或全部页

## 🛠️ 技术栈

- React 18
- TypeScript
- Vite
- marked (Markdown 解析)
- highlight.js (代码高亮)
- html-to-image (图片导出)
- JSZip (ZIP 打包)

## 📄 License

MIT
