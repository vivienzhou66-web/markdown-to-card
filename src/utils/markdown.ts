import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre class="code-block"><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

renderer.table = function (token: any) {
  let headerHtml = '';
  if (token.header && token.header.length > 0) {
    headerHtml = '<tr>' + token.header.map((cell: any) => `<th>${cell.tokens ? cell.tokens.map((t: any) => t.raw || t.text || '').join('') : cell.text || ''}</th>`).join('') + '</tr>';
  }
  
  let rowsHtml = '';
  if (token.rows && token.rows.length > 0) {
    rowsHtml = token.rows.map((row: any) => 
      '<tr>' + row.map((cell: any) => `<td>${cell.tokens ? cell.tokens.map((t: any) => t.raw || t.text || '').join('') : cell.text || ''}</td>`).join('') + '</tr>'
    ).join('');
  }
  
  return `<table><thead>${headerHtml}</thead><tbody>${rowsHtml}</tbody></table>`;
};

renderer.blockquote = function ({ text }: { text: string }) {
  return `<blockquote>${text}</blockquote>`;
};

export const markdownToHtml = (markdown: string): string => {
  return marked.parse(markdown, { renderer }) as string;
};

export const splitPages = (markdown: string): string[] => {
  const pages = markdown.split(/\n---\n|\n---$|^---\n/);
  return pages.filter(page => page.trim() !== '');
};

export const insertMarkdown = (
  textarea: HTMLTextAreaElement,
  type: string
): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selectedText = text.substring(start, end);

  let replacement = '';
  let cursorOffset = 0;

  switch (type) {
    case 'bold':
      replacement = `**${selectedText || '粗体文本'}**`;
      cursorOffset = selectedText ? replacement.length : 2;
      break;
    case 'italic':
      replacement = `*${selectedText || '斜体文本'}*`;
      cursorOffset = selectedText ? replacement.length : 1;
      break;
    case 'strikethrough':
      replacement = `~~${selectedText || '删除线文本'}~~`;
      cursorOffset = selectedText ? replacement.length : 2;
      break;
    case 'h1':
      replacement = `# ${selectedText || '标题1'}`;
      cursorOffset = replacement.length;
      break;
    case 'h2':
      replacement = `## ${selectedText || '标题2'}`;
      cursorOffset = replacement.length;
      break;
    case 'h3':
      replacement = `### ${selectedText || '标题3'}`;
      cursorOffset = replacement.length;
      break;
    case 'link':
      replacement = `[${selectedText || '链接文本'}](url)`;
      cursorOffset = replacement.length - 1;
      break;
    case 'image':
      replacement = `![${selectedText || '图片描述'}](url)`;
      cursorOffset = replacement.length - 1;
      break;
    case 'code':
      replacement = `\`${selectedText || '代码'}\``;
      cursorOffset = selectedText ? replacement.length : 1;
      break;
    case 'codeblock':
      replacement = `\`\`\`\n${selectedText || '代码块'}\n\`\`\``;
      cursorOffset = 4;
      break;
    case 'ul':
      replacement = `- ${selectedText || '列表项'}`;
      cursorOffset = replacement.length;
      break;
    case 'ol':
      replacement = `1. ${selectedText || '列表项'}`;
      cursorOffset = replacement.length;
      break;
    case 'quote':
      replacement = `> ${selectedText || '引用文本'}`;
      cursorOffset = replacement.length;
      break;
    case 'hr':
      replacement = `\n---\n`;
      cursorOffset = replacement.length;
      break;
    case 'table':
      replacement = `| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |`;
      cursorOffset = replacement.length;
      break;
    case 'pagebreak':
      replacement = `\n\n---\n\n`;
      cursorOffset = replacement.length;
      break;
    default:
      return;
  }

  const newText = text.substring(0, start) + replacement + text.substring(end);
  textarea.value = newText;

  const newCursorPosition = start + cursorOffset;
  textarea.setSelectionRange(newCursorPosition, newCursorPosition);
  textarea.focus();

  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
};
