// Header.jsx
import React from 'react';
import { Col } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';

const Header = ({ isDetailView, onBack, personName }) => {
    return (
        <Col xs={12} style={{ backgroundColor: '#121212' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isDetailView ? (
                    <>
                        <IoIosArrowBack size={24} color='white' onClick={onBack} style={{ cursor: 'pointer' }}/>
                        <h1 style={{ color: 'white' }}>{personName}</h1>
                        <div></div>
                    </>
                ) : (
                    <h1 style={{ color: 'white' }}>People of Star Wars</h1>
                )}
            </div>
        </Col>
    );
};

export default Header;