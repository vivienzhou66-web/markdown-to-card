import React, { useRef, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const defaultContent = `# 欢迎使用 Markdown to Card

这是一个将 **Markdown** 转换为精美卡片的工具。

## 功能特点

- ✨ 支持多种主题样式
- 📝 实时预览
- 🖼️ 一键导出PNG图片
- 💻 支持代码高亮

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 表格示例

| 功能 | 支持 | 说明 |
| --- | --- | --- |
| 标题 | ✅ | H1-H6 |
| 列表 | ✅ | 有序/无序 |
| 代码 | ✅ | 语法高亮 |

> 💡 提示：点击上方工具栏按钮可以快速插入Markdown语法

开始编辑你的内容吧！
`;

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="editor-container">
      <EditorToolbar textareaRef={textareaRef} onContentChange={() => onChange(textareaRef.current?.value || '')} />
      <textarea
        ref={textareaRef}
        className="markdown-editor"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="在此输入Markdown内容..."
        spellCheck={false}
      />
    </div>
  );
};

export default MarkdownEditor;
export { defaultContent };
