import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './components/SideBar';
import PersonDetail from './components/PersonDetail';

function App() {
    const [selectedPerson, setSelectedPerson] = useState(null);

    return (
        <Container fluid >
            <Row>
                <Col xs={12} style={{ backgroundColor: '#121212' }}>
                    <h1 style={{ color: 'white' }}>Ravn Star Wars Registry</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <SideBar onSelect={(person) => setSelectedPerson(person)} />
                </Col>
                <Col xs={12} md={8}>
                    {selectedPerson && <PersonDetail person={selectedPerson} />}
                </Col>
            </Row>
        </Container>
    );
}

export default App;
