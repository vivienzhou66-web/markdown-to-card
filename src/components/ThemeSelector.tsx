import React, { useState } from 'react';
import { themes } from '../themes';
import type { Theme } from '../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-selector">
      <button className="theme-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="theme-icon">🎨</span>
        <span className="theme-name">{currentTheme.nameCn}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme.id === theme.id ? 'active' : ''}`}
              onClick={() => {
                onSelectTheme(theme);
                setIsOpen(false);
              }}
            >
              <div
                className="theme-preview"
                style={{
                  background: theme.backgroundColor.includes('gradient')
                    ? theme.backgroundColor
                    : theme.backgroundColor,
                }}
              >
                <div className="preview-header" style={{ color: theme.headingColor }}>Aa</div>
                <div className="preview-text" style={{ color: theme.textColor }}>文</div>
              </div>
              <span className="theme-label">{theme.nameCn}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
