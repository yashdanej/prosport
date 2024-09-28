// SystemConfigurationComponent.jsx
import React, { useState } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// import IntegrationsComponent from './IntegrationsComponent';
// import SecuritySettingsComponent from './SecuritySettingsComponent';
// import BackupsMaintenanceComponent from './BackupsMaintenanceComponent';

const SystemConfigurationComponent = () => {
  const [activeTab, setActiveTab] = useState('generalSettings');

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">System Configuration</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'generalSettings' ? 'active' : ''}
            onClick={() => setActiveTab('generalSettings')}
          >
            General Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'integrations' ? 'active' : ''}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            Security Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'backups' ? 'active' : ''}
            onClick={() => setActiveTab('backups')}
          >
            Backups & Maintenance
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {/* <TabPane tabId="generalSettings">
          <GeneralSettingsComponent />
        </TabPane> */}
        {/* <TabPane tabId="integrations">
          <IntegrationsComponent />
        </TabPane>
        <TabPane tabId="security">
          <SecuritySettingsComponent />
        </TabPane>
        <TabPane tabId="backups">
          <BackupsMaintenanceComponent />
        </TabPane> */}
      </TabContent>
    </Container>
    </div>
  );
};

export default SystemConfigurationComponent;