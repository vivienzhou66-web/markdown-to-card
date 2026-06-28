import React, { useState } from 'react';

interface ExportButtonProps {
  onExportCurrentPage: () => void;
  onExportAllPages: () => void;
  onCopyImage: () => void;
  hasMultiplePages: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  onExportCurrentPage,
  onExportAllPages,
  onCopyImage,
  hasMultiplePages,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="export-button-container">
      <button className="export-main-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="export-icon">📥</span>
        <span>导出</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="export-dropdown">
          <button
            className="export-option"
            onClick={() => {
              onExportCurrentPage();
              setIsOpen(false);
            }}
          >
            <span className="option-icon">📷</span>
            <div className="option-text">
              <span className="option-title">导出当前页</span>
              <span className="option-desc">仅导出当前显示的页面</span>
            </div>
          </button>
          {hasMultiplePages && (
            <button
              className="export-option"
              onClick={() => {
                onExportAllPages();
                setIsOpen(false);
              }}
            >
              <span className="option-icon">📦</span>
              <div className="option-text">
                <span className="option-title">导出全部页</span>
                <span className="option-desc">打包导出所有页面为ZIP</span>
              </div>
            </button>
          )}
          <button
            className="export-option"
            onClick={() => {
              onCopyImage();
              setIsOpen(false);
            }}
          >
            <span className="option-icon">📋</span>
            <div className="option-text">
              <span className="option-title">复制到剪贴板</span>
              <span className="option-desc">直接粘贴使用</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
