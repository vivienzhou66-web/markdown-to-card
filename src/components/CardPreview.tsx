import React, { forwardRef } from 'react';
import type { Theme } from '../types';

interface Page {
  id: number;
  content: string;
}

interface CardPreviewProps {
  pages: Page[];
  currentPage: number;
  theme: Theme;
  pageNumberPosition: 'left' | 'right' | 'center';
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ pages, currentPage, theme, pageNumberPosition }, ref) => {
  const getBackgroundStyle = (bg: string): React.CSSProperties => {
    if (bg.includes('gradient')) {
      return { background: bg };
    }
    return { backgroundColor: bg };
  };

  const cardStyle: React.CSSProperties = {
    ...getBackgroundStyle(theme.cardBackground),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    borderRadius: theme.borderRadius,
    boxShadow: theme.shadow,
    padding: '32px',
    minHeight: '200px',
    width: '480px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    position: 'relative',
  };

  const contentStyle: React.CSSProperties = {
    ...getBackgroundStyle(theme.backgroundColor),
    borderRadius: theme.borderRadius,
    padding: '24px',
    minHeight: '400px',
  };

  const pageNumberStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '12px',
    fontSize: '12px',
    color: theme.textColor,
    opacity: 0.6,
    ...(pageNumberPosition === 'left' && { left: '24px' }),
    ...(pageNumberPosition === 'right' && { right: '24px' }),
    ...(pageNumberPosition === 'center' && { left: '50%', transform: 'translateX(-50%)' }),
  };

  const currentPageData = pages[currentPage];

  if (!currentPageData) {
    return (
      <div ref={ref} className="card-preview" style={cardStyle}>
        <div style={contentStyle}>
          <p style={{ color: theme.textColor, opacity: 0.5 }}>开始编辑内容...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="card-preview" style={cardStyle}>
      <div
        className="card-content"
        style={contentStyle}
        dangerouslySetInnerHTML={{ __html: getStyledHtml(currentPageData.content, theme) }}
      />
      {pages.length > 1 && (
        <div style={pageNumberStyle}>
          {currentPage + 1} / {pages.length}
        </div>
      )}
    </div>
  );
});

CardPreview.displayName = 'CardPreview';

function getStyledHtml(html: string, theme: Theme): string {
  const style = `
    <style>
      .card-content h1 { color: ${theme.headingColor}; font-size: 28px; margin-bottom: 16px; font-weight: 700; }
      .card-content h2 { color: ${theme.headingColor}; font-size: 22px; margin: 20px 0 12px; font-weight: 600; }
      .card-content h3 { color: ${theme.headingColor}; font-size: 18px; margin: 16px 0 10px; font-weight: 600; }
      .card-content h4 { color: ${theme.headingColor}; font-size: 16px; margin: 14px 0 8px; font-weight: 600; }
      .card-content h5 { color: ${theme.headingColor}; font-size: 14px; margin: 12px 0 6px; font-weight: 600; }
      .card-content h6 { color: ${theme.headingColor}; font-size: 12px; margin: 10px 0 4px; font-weight: 600; }
      .card-content p { margin: 10px 0; line-height: 1.7; }
      .card-content ul, .card-content ol { margin: 10px 0; padding-left: 24px; }
      .card-content li { margin: 6px 0; line-height: 1.6; }
      .card-content a { color: ${theme.borderLeftColor}; text-decoration: none; }
      .card-content a:hover { text-decoration: underline; }
      .card-content blockquote {
        border-left: 4px solid ${theme.borderLeftColor};
        margin: 16px 0;
        padding: 12px 16px;
        background: rgba(0,0,0,0.03);
        border-radius: 0 8px 8px 0;
      }
      .card-content pre.code-block {
        background: ${theme.codeBackground};
        border-radius: 8px;
        padding: 16px;
        overflow-x: auto;
        margin: 16px 0;
      }
      .card-content code {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 14px;
      }
      .card-content p code {
        background: ${theme.codeBackground};
        color: ${theme.codeColor};
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
      }
      .card-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        display: block;
        overflow-x: auto;
      }
      .card-content th, .card-content td {
        border: 1px solid #e0e0e0;
        padding: 10px 12px;
        text-align: left;
        white-space: nowrap;
      }
      .card-content th {
        background: ${theme.codeBackground};
        font-weight: 600;
      }
      .card-content tr:nth-child(even) {
        background: rgba(0,0,0,0.02);
      }
      .card-content hr {
        border: none;
        border-top: 2px solid #e0e0e0;
        margin: 20px 0;
      }
      .card-content img {
        max-width: 100%;
        border-radius: 8px;
        margin: 10px 0;
      }
      .card-content strong { font-weight: 600; }
      .card-content em { font-style: italic; }
      .card-content del { text-decoration: line-through; opacity: 0.7; }
    </style>
  `;
  return style + html;
}

export default CardPreview;
