// SecuritySettingsComponent.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const SecuritySettingsComponent = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordComplexity: 'medium',
    sessionTimeout: 30,
    ipWhitelist: '',
  });

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    // Replace with actual API call
    const mockSettings = {
      twoFactorAuth: true,
      passwordComplexity: 'high',
      sessionTimeout: 60,
      ipWhitelist: '192.168.1.1, 10.0.0.1',
    };
    setSecuritySettings(mockSettings);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSecuritySettings({ ...securitySettings, [e.target.name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement security settings update logic
    console.log('Updating security settings:', securitySettings);
  };

  return (
    <div className='page-body'>
    <Card className="mt-4">
      <CardBody>
        <h3>Security Settings</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="twoFactorAuth" checked={securitySettings.twoFactorAuth} onChange={handleInputChange} />{' '}
              Enable Two-Factor Authentication
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="passwordComplexity">Password Complexity</Label>
            <Input type="select" name="passwordComplexity" id="passwordComplexity" value={securitySettings.passwordComplexity} onChange={handleInputChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="sessionTimeout">Session Timeout (minutes)</Label>
            <Input type="number" name="sessionTimeout" id="sessionTimeout" value={securitySettings.sessionTimeout} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="ipWhitelist">IP Whitelist (comma-separated)</Label>
            <Input type="textarea" name="ipWhitelist" id="ipWhitelist" value={securitySettings.ipWhitelist} onChange={handleInputChange} />
          </FormGroup>
          <Button color="primary" type="submit">Update Security Settings</Button>
        </Form>
        <Alert color="info" className="mt-3">
          Ensure that you keep these settings up to date to maintain the security of your system.
        </Alert>
      </CardBody>
    </Card>
    </div>
  );
};

export default SecuritySettingsComponent;