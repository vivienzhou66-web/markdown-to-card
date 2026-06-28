import React from 'react';
import { insertMarkdown } from '../utils/markdown';

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onContentChange: () => void;
}

const toolbarItems = [
  { icon: 'B', label: '加粗', action: 'bold', style: { fontWeight: 'bold' } },
  { icon: 'I', label: '斜体', action: 'italic', style: { fontStyle: 'italic' } },
  { icon: 'S', label: '删除线', action: 'strikethrough', style: { textDecoration: 'line-through' } },
  { icon: 'H1', label: '标题1', action: 'h1', style: { fontSize: '14px', fontWeight: 'bold' } },
  { icon: 'H2', label: '标题2', action: 'h2', style: { fontSize: '12px', fontWeight: 'bold' } },
  { icon: 'H3', label: '标题3', action: 'h3', style: { fontSize: '10px', fontWeight: 'bold' } },
  { icon: '🔗', label: '链接', action: 'link', style: {} },
  { icon: '🖼', label: '图片', action: 'image', style: {} },
  { icon: '<>', label: '代码', action: 'code', style: { fontFamily: 'monospace' } },
  { icon: '{}', label: '代码块', action: 'codeblock', style: { fontFamily: 'monospace' } },
  { icon: '•', label: '无序列表', action: 'ul', style: {} },
  { icon: '1.', label: '有序列表', action: 'ol', style: {} },
  { icon: '"', label: '引用', action: 'quote', style: { fontSize: '18px' } },
  { icon: '—', label: '分割线', action: 'hr', style: {} },
  { icon: '⊞', label: '表格', action: 'table', style: {} },
  { icon: '📄', label: '分页符', action: 'pagebreak', style: {} },
];

const EditorToolbar: React.FC<EditorToolbarProps> = ({ textareaRef, onContentChange }) => {
  const handleInsert = (action: string) => {
    if (textareaRef.current) {
      insertMarkdown(textareaRef.current, action);
      onContentChange();
    }
  };

  return (
    <div className="editor-toolbar">
      {toolbarItems.map((item) => (
        <button
          key={item.action}
          className="toolbar-btn"
          title={item.label}
          onClick={() => handleInsert(item.action)}
          style={item.style}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default EditorToolbar;
