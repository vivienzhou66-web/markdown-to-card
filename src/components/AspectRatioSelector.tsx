import React from 'react';

export type AspectRatio = '9:16' | '3:4' | '1:1' | 'auto';

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const ratios: { value: AspectRatio; label: string; icon: string }[] = [
  { value: '9:16', label: '9:16', icon: '📱' },
  { value: '3:4', label: '3:4', icon: '📷' },
  { value: '1:1', label: '1:1', icon: '⬜' },
  { value: 'auto', label: '自动', icon: '📐' },
];

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="aspect-ratio-selector">
      <label className="settings-label">图片比例</label>
      <div className="ratio-options">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            className={`ratio-btn ${value === ratio.value ? 'active' : ''}`}
            onClick={() => onChange(ratio.value)}
            title={ratio.label}
          >
            <span className="ratio-icon">{ratio.icon}</span>
            <span className="ratio-label">{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const getAspectRatioDimensions = (ratio: AspectRatio): { width: number; height: number } | null => {
  switch (ratio) {
    case '9:16':
      return { width: 480, height: 854 };
    case '3:4':
      return { width: 480, height: 640 };
    case '1:1':
      return { width: 480, height: 480 };
    case 'auto':
    default:
      return null;
  }
};

export default AspectRatioSelector;
