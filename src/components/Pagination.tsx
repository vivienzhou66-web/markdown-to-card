import React from 'react';
import type { Theme } from '../types';

interface Page {
  id: number;
  content: string;
}

interface PaginationProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (page: number) => void;
  theme: Theme;
  pageNumberPosition: 'left' | 'right' | 'center';
  exportMode?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  onPageChange,
  theme,
  pageNumberPosition,
  exportMode = false,
}) => {
  if (pages.length <= 1 && !exportMode) return null;

  const getPageNumberStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      fontSize: '12px',
      color: theme.textColor,
      opacity: 0.6,
      marginTop: '12px',
      padding: '4px 0',
    };

    switch (pageNumberPosition) {
      case 'left':
        return { ...baseStyle, textAlign: 'left' };
      case 'right':
        return { ...baseStyle, textAlign: 'right' };
      case 'center':
      default:
        return { ...baseStyle, textAlign: 'center' };
    }
  };

  if (exportMode) {
    const page = pages[currentPage];
    if (!page) return null;

    return (
      <div className="pagination-card">
        <div
          className="card-content-wrapper"
          dangerouslySetInnerHTML={{ __html: getStyledHtml(page.content, theme) }}
        />
        <div style={getPageNumberStyle()}>
          {currentPage + 1} / {pages.length}
        </div>
      </div>
    );
  }

  return (
    <div className="pagination-container">
      <div className="pagination-cards">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={`pagination-card ${index === currentPage ? 'active' : ''}`}
          >
            <div
              className="card-content-wrapper"
              dangerouslySetInnerHTML={{ __html: getStyledHtml(page.content, theme) }}
            />
            <div style={getPageNumberStyle()}>
              {index + 1} / {pages.length}
            </div>
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            ← 上一页
          </button>
          <div className="pagination-dots">
            {pages.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(index)}
              />
            ))}
          </div>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pages.length - 1}
          >
            下一页 →
          </button>
        </div>
      )}
    </div>
  );
};

function getStyledHtml(html: string, theme: any): string {
  const style = `
    <style>
      .card-content-wrapper h1 { color: ${theme.headingColor}; font-size: 28px; margin-bottom: 16px; font-weight: 700; }
      .card-content-wrapper h2 { color: ${theme.headingColor}; font-size: 22px; margin: 20px 0 12px; font-weight: 600; }
      .card-content-wrapper h3 { color: ${theme.headingColor}; font-size: 18px; margin: 16px 0 10px; font-weight: 600; }
      .card-content-wrapper h4 { color: ${theme.headingColor}; font-size: 16px; margin: 14px 0 8px; font-weight: 600; }
      .card-content-wrapper h5 { color: ${theme.headingColor}; font-size: 14px; margin: 12px 0 6px; font-weight: 600; }
      .card-content-wrapper h6 { color: ${theme.headingColor}; font-size: 12px; margin: 10px 0 4px; font-weight: 600; }
      .card-content-wrapper p { margin: 10px 0; line-height: 1.7; }
      .card-content-wrapper ul, .card-content-wrapper ol { margin: 10px 0; padding-left: 24px; }
      .card-content-wrapper li { margin: 6px 0; line-height: 1.6; }
      .card-content-wrapper a { color: ${theme.borderLeftColor}; text-decoration: none; }
      .card-content-wrapper a:hover { text-decoration: underline; }
      .card-content-wrapper blockquote {
        border-left: 4px solid ${theme.borderLeftColor};
        margin: 16px 0;
        padding: 12px 16px;
        background: rgba(0,0,0,0.03);
        border-radius: 0 8px 8px 0;
      }
      .card-content-wrapper pre.code-block {
        background: ${theme.codeBackground};
        border-radius: 8px;
        padding: 16px;
        overflow-x: auto;
        margin: 16px 0;
      }
      .card-content-wrapper code {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 14px;
      }
      .card-content-wrapper p code {
        background: ${theme.codeBackground};
        color: ${theme.codeColor};
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
      }
      .card-content-wrapper table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        display: block;
        overflow-x: auto;
      }
      .card-content-wrapper th, .card-content-wrapper td {
        border: 1px solid #e0e0e0;
        padding: 10px 12px;
        text-align: left;
        white-space: nowrap;
      }
      .card-content-wrapper th {
        background: ${theme.codeBackground};
        font-weight: 600;
      }
      .card-content-wrapper tr:nth-child(even) {
        background: rgba(0,0,0,0.02);
      }
      .card-content-wrapper hr {
        border: none;
        border-top: 2px solid #e0e0e0;
        margin: 20px 0;
      }
      .card-content-wrapper img {
        max-width: 100%;
        border-radius: 8px;
        margin: 10px 0;
      }
      .card-content-wrapper strong { font-weight: 600; }
      .card-content-wrapper em { font-style: italic; }
      .card-content-wrapper del { text-decoration: line-through; opacity: 0.7; }
    </style>
  `;
  return style + html;
}

export default Pagination;
