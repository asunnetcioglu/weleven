import React from 'react';
import Header from './header/header';
import Content from "./content/content";
import './App.scss';
import {Col, Row} from "react-bootstrap";

const App = () => {
    return (
        <Row>
            <Col>
                <section>
                    <Header />
                    <Content />
                </section>
            </Col>
        </Row>
    )
}

export default App;