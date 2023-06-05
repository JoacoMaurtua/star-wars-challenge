import React from 'react';

const NoticeCell = ({ message = 'Failed to Load Data' }) => {
  return (
    <div 
      data-testid="notice-cell" /* Para reconocer el elemento en el archivo de testing */
      style={{ textAlign: 'center', padding: '10px', color: 'rgba(235, 87, 87, 1)' }}
    >
      <h2 style={{fontSize:'17px'}}>{message}</h2>
    </div>
  );
};

export default NoticeCell;

