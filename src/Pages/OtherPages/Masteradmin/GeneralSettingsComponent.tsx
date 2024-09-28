// GeneralSettingsComponent.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const GeneralSettingsComponent = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    adminEmail: '',
    timezone: '',
    dateFormat: '',
  });

  useEffect(() => {
    // Fetch current settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    // Replace with actual API call
    const mockSettings = {
      siteName: 'Pro Sports API',
      siteDescription: 'Comprehensive sports data API',
      adminEmail: 'admin@prosportsapi.com',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
    };
    setSettings(mockSettings);
  };

  const handleInputChange = (e: any) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement settings update logic
    console.log('Updating settings:', settings);
  };

  return (
    <div className="page-body">
    <Card className="mt-4">
      <CardBody>
        <h3>General Settings</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="siteName">Site Name</Label>
            <Input type="text" name="siteName" id="siteName" value={settings.siteName} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="siteDescription">Site Description</Label>
            <Input type="textarea" name="siteDescription" id="siteDescription" value={settings.siteDescription} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="adminEmail">Admin Email</Label>
            <Input type="email" name="adminEmail" id="adminEmail" value={settings.adminEmail} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="timezone">Timezone</Label>
            <Input type="select" name="timezone" id="timezone" value={settings.timezone} onChange={handleInputChange}>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              {/* Add more timezone options */}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dateFormat">Date Format</Label>
            <Input type="select" name="dateFormat" id="dateFormat" value={settings.dateFormat} onChange={handleInputChange}>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">Save Settings</Button>
        </Form>
      </CardBody>
    </Card>
    </div>
  );
};

export default GeneralSettingsComponent;