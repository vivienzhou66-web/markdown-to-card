import React, { useState, useRef, useCallback, useMemo } from 'react';
import MarkdownEditor, { defaultContent } from './components/MarkdownEditor';
import CardPreview from './components/CardPreview';
import ThemeSelector from './components/ThemeSelector';
import ExportButton from './components/ExportButton';
import Pagination from './components/Pagination';
import PaginationSettings from './components/PaginationSettings';
import { themes } from './themes';
import { markdownToHtml, splitPages } from './utils/markdown';
import { exportToPng, exportAllPages, copyToClipboard } from './utils/export';
import './App.css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(defaultContent);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumberPosition, setPageNumberPosition] = useState<'left' | 'right' | 'center'>('center');
  const cardRef = useRef<HTMLDivElement>(null);
  const allPageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const pages = useMemo(() => {
    const pageContents = splitPages(markdown);
    return pageContents.map((content, index) => ({
      id: index,
      content: markdownToHtml(content),
    }));
  }, [markdown]);

  const handleExportCurrentPage = useCallback(async () => {
    if (cardRef.current) {
      await exportToPng(cardRef.current, `card-page-${currentPage + 1}.png`);
    }
  }, [currentPage]);

  const handleExportAllPages = useCallback(async () => {
    if (allPageRefs.current.size > 0) {
      const pageElements = pages.map((page) => ({
        id: page.id,
        element: allPageRefs.current.get(page.id)!,
      })).filter((p) => p.element);
      
      if (pageElements.length > 0) {
        await exportAllPages(pageElements, 'card');
      }
    }
  }, [pages]);

  const handleCopyImage = useCallback(async () => {
    if (cardRef.current) {
      await copyToClipboard(cardRef.current);
      alert('已复制到剪贴板！');
    }
  }, []);

  const handleThemeChange = useCallback((theme: typeof currentTheme) => {
    setCurrentTheme(theme);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">📝</span>
          <span className="logo-text">Markdown to Card</span>
        </div>
        <div className="header-actions">
          <PaginationSettings
            pageNumberPosition={pageNumberPosition}
            onPositionChange={setPageNumberPosition}
          />
          <ThemeSelector currentTheme={currentTheme} onSelectTheme={handleThemeChange} />
          <ExportButton
            onExportCurrentPage={handleExportCurrentPage}
            onExportAllPages={handleExportAllPages}
            onCopyImage={handleCopyImage}
            hasMultiplePages={pages.length > 1}
          />
        </div>
      </header>
      
      <main className="app-main">
        <div className="editor-panel">
          <MarkdownEditor value={markdown} onChange={setMarkdown} />
        </div>
        <div className="preview-panel">
          <CardPreview
            ref={cardRef}
            pages={pages}
            currentPage={currentPage}
            theme={currentTheme}
            pageNumberPosition={pageNumberPosition}
          />
          <Pagination
            pages={pages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            theme={currentTheme}
            pageNumberPosition={pageNumberPosition}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
