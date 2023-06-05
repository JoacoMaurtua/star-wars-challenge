import React from 'react';
import { Col } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';


const Header = ({ isDetailView, onBack, personName }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <Col xs={12} style={{ backgroundColor: '#121212', height: '56px', alignItems: 'center', display: 'flex', paddingLeft: '24px', paddingRight: '24px' }}>
            <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'start', alignItems: 'center', width: '100%' }}>
                {isMobile && isDetailView ? (
                    <>
                        <button
                            aria-label="back"
                            onClick={onBack}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', left: 0 }}
                        >
                            <IoIosArrowBack size={24} color="white" />
                        </button>
                        <h1 style={{ color: 'white', textAlign: 'center', fontSize: '19px' }}>{personName}</h1>
                    </>
                ) : (
                    <h1 style={{ color: 'white', textAlign: isMobile ? 'center' : 'left', fontSize: '19px' }}>
                        {isMobile ? 'People' : 'Ravn Star Wars Registry'}
                    </h1>
                )}
            </div>
        </Col>
    );
};

export default Header;
