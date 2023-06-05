import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './components/SideBar';
import PersonDetail from './components/PersonDetail';
import Header from './components/Header';
import { useMediaQuery } from 'react-responsive';

function App() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
   

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
        setShowDetail(true);
    }

    const handleBack = () => {
        setShowDetail(false);
    }

    return (
        <Container fluid >
            <Row>
                <Header isDetailView={showDetail} onBack={handleBack} personName={selectedPerson?.name} />
            </Row>
            <Row>
                {isMobile && showDetail ? (
                    <Col xs={12}>
                        <PersonDetail person={selectedPerson} />
                    </Col>
                ) : (
                    <>
                        <Col xs={12} md={4}>
                            <SideBar onSelect={handleSelectPerson} />
                        </Col>
                        {!isMobile && (
                            <Col xs={12} md={8}>
                                {showDetail && <PersonDetail person={selectedPerson} />}
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </Container>
    );
}

export default App;