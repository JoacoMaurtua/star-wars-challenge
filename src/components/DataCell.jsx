import React from 'react';

const DataCell = ({ label, value }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
      <h2 style={{ color: 'rgba(0,0,0,0.3)', margin: 0 }}>{label}</h2>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );
};

export default DataCell;