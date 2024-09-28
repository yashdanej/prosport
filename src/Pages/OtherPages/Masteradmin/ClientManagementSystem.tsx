import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useParams, Routes } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// Mock data for demonstration
const clients = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
];

const ClientList = () => (
  <ListGroup>
    {clients.map(client => (
      <ListGroupItem key={client.id} tag={Link} to={`/client/${client.id}`}>
        {client.name}
      </ListGroupItem>
    ))}
  </ListGroup>
);

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { id } = useParams();

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <h2 className="mb-4">Client Profile: {clients.find((c: any) => c.id == id)?.name}</h2>
      <Nav tabs>
        {['Overview', 'API Keys', 'Billing', 'Security', 'Statements', 'Referrals', 'Documents', 'Logs'].map(tab => (
          <NavItem key={tab.toLowerCase()}>
            <NavLink
              className={activeTab === tab.toLowerCase() ? 'active' : ''}
              onClick={() => toggle(tab.toLowerCase())}
            >
              {tab}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {['overview', 'apiKeys', 'billing', 'security', 'statements', 'referrals', 'documents', 'logs'].map(tab => (
          <TabPane tabId={tab} key={tab}>
            <Row>
              <Col sm="12">
                <h4 className="mt-3">{tab.charAt(0).toUpperCase() + tab.slice(1)} Content</h4>
                <p>This is the content for the {tab} tab.</p>
              </Col>
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </Container>
  );
};

const ClientManagementSystem = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col md="3">
            <h2 className="mb-3">Client List</h2>
            <ClientList />
          </Col>
          <Col md="9">
            <Routes>
              <Route path="/" element={<h2>Select a client to view their profile</h2>} />
              <Route path="/client/:id" element={<ClientProfile />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default ClientManagementSystem;