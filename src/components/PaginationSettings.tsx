import React from 'react';

interface PaginationSettingsProps {
  pageNumberPosition: 'left' | 'right' | 'center';
  onPositionChange: (position: 'left' | 'right' | 'center') => void;
}

const PaginationSettings: React.FC<PaginationSettingsProps> = ({
  pageNumberPosition,
  onPositionChange,
}) => {
  return (
    <div className="pagination-settings">
      <label className="settings-label">页码位置</label>
      <div className="position-options">
        <button
          className={`position-btn ${pageNumberPosition === 'left' ? 'active' : ''}`}
          onClick={() => onPositionChange('left')}
          title="左下角"
        >
          <span className="position-icon">◀</span>
          <span>左</span>
        </button>
        <button
          className={`position-btn ${pageNumberPosition === 'center' ? 'active' : ''}`}
          onClick={() => onPositionChange('center')}
          title="底部中间"
        >
          <span className="position-icon">◆</span>
          <span>中</span>
        </button>
        <button
          className={`position-btn ${pageNumberPosition === 'right' ? 'active' : ''}`}
          onClick={() => onPositionChange('right')}
          title="右下角"
        >
          <span className="position-icon">▶</span>
          <span>右</span>
        </button>
      </div>
    </div>
  );
};

export default PaginationSettings;
