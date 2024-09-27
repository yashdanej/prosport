import React, { useState } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const APIDocumentation = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab: any) => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">API Documentation</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => { toggle('1'); }}
          >
            Introduction
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => { toggle('2'); }}
          >
            Authentication
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => { toggle('3'); }}
          >
            Endpoints
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '4' ? 'active' : ''}
            onClick={() => { toggle('4'); }}
          >
            Rate Limiting
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <h3>Introduction</h3>
          <p>Welcome to the Pro Sports API documentation. This API provides access to real-time sports data...</p>
        </TabPane>
        <TabPane tabId="2">
          <h3>Authentication</h3>
          <p>To use the API, you need to authenticate your requests using an API key...</p>
        </TabPane>
        <TabPane tabId="3">
          <h3>Endpoints</h3>
          <ul>
            <li>/api/live-scores</li>
            <li>/api/player-stats</li>
            <li>/api/team-rankings</li>
            {/* Add more endpoints */}
          </ul>
        </TabPane>
        <TabPane tabId="4">
          <h3>Rate Limiting</h3>
          <p>Our API implements rate limiting to ensure fair usage. The current limits are...</p>
        </TabPane>
      </TabContent>
    </Container>
    </div>
  );
};

export default APIDocumentation;