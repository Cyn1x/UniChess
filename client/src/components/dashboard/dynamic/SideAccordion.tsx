import React from 'react';

import { Accordion, Card, Button } from 'react-bootstrap';

const SideAccordion = () => (
    <Accordion>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Leaderboards
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Tournaments
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Ranked
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    Unranked
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                    Statistics
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                    Help
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="5">
                <Card.Body>Sample Text</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
);

export default SideAccordion;
