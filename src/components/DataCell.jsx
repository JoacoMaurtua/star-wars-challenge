const DataCell = ({ label, value, isValueOnly }) => {
  const valueFormatted = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

  return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1.5px solid #a8a8a8', paddingBottom: '10px' }}>
          {!isValueOnly && <h2 style={{ color: 'rgba(158, 158, 158, 1)', fontSize: '17px', fontWeight: 'bold', margin: '0', marginRight: '10px' }}>{label}</h2>}
          <h2 style={{ fontSize: '17px', margin: '0', fontWeight: 'bold', marginLeft: '10px' }}>{isValueOnly ? label : valueFormatted}</h2>
      </div>
  );
};

export default DataCell;