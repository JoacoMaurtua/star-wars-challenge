import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingCell = () => {
    return (
        <div style={{ textAlign: 'center', padding: '10px' }}>
            <Spinner animation="border" role="status" />
            <p>Loading</p>
        </div>
    );
};

export default LoadingCell;
