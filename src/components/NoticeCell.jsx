import React from 'react';

const NoticeCell = ({ message = 'Failed to Load Data' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '10px', color: 'rgba(235, 87, 87, 1)' }}>
      <h2>{message}</h2>
    </div>
  );
};

export default NoticeCell;