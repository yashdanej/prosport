import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table, Button, Badge, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Alert, Progress } from 'reactstrap';
import { Copy, Eye, EyeOff, RefreshCw, Shield, Smartphone, Mail, Key } from 'lucide-react';

const ClientAccountSecurityComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('accountOverview');
  const [userData, setUserData] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState<any>([]);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [securitySettings, setSecuritySettings] = useState<any>(null);
  const [showSecretKey, setShowSecretKey] = useState<any>({});

  useEffect(() => {
    fetchUserData();
    fetchApiKeys();
    fetchBillingInfo();
    fetchSecuritySettings();
  }, []);

  const fetchUserData = async () => {
    // Replace with actual API call
    const mockUserData = {
      name: 'Yash Dev',
      email: 'example@site.com',
      location: 'Surat, Gujarat',
      profileCompletion: 90
    };
    setUserData(mockUserData);
  };

  const fetchApiKeys = async () => {
    // Replace with actual API call
    const mockApiKeys = [
      { domain: 'acbd.com', accessKey: 'e42032c2-7e67-4e58', secretKey: 'e42032c2-7e67-4e58', status: 'Active', createDate: '01 Sep, 2024', expiryDate: '07 Sep, 2024' },
      { domain: 'xyza.com', accessKey: 'e42032c2-7e67-4e58', secretKey: 'e42032c2-7e67-4e58', status: 'Revoked', createDate: '01 Sep, 2024', expiryDate: '07 Sep, 2024' },
    ];
    setApiKeys(mockApiKeys);
  };

  const fetchBillingInfo = async () => {
    // Replace with actual API call
    const mockBillingInfo = {
      currentPlan: 'Basic Plan',
      price: '$29.99 Per Month',
      nextBillingDate: '14 days remaining until your plan requires update',
      lastPayment: '**** **** **** 4748',
      invoices: [
        { date: '09 Apr, 2023', invoiceNo: '195495', description: 'Monthly subscription for premium', amount: '$69.93', status: 'Unpaid' }
      ]
    };
    setBillingInfo(mockBillingInfo);
  };

  const fetchSecuritySettings = async () => {
    // Replace with actual API call
    const mockSecuritySettings = {
      recentDevices: [
        { browser: 'Google Chrome', device: 'Gateway Notebook 116', location: 'Austin, Texas', recentActivity: '09 Apr, 2023', status: 'OK', ipAddress: '156.68.147.21' },
        { browser: 'Safari', device: 'Dell XPS Touchmate', location: 'Denver, Colorado', recentActivity: '08 Apr, 2023', status: 'OK', ipAddress: '210.91.120.57' },
      ],
      twoFactor: {
        biometric: true,
        email: 'barry@domain.com',
        googleAuth: true,
        phone: '+1-202-555-0176'
      }
    };
    setSecuritySettings(mockSecuritySettings);
  };

  const toggleSecretKey = (index: any) => {
    setShowSecretKey((prev: any) => ({ ...prev, [index]: !prev[index] }));
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    // You might want to show a "Copied!" message here
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Account & Security</h1>
      
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2>{userData?.name}</h2>
                  <p>{userData?.email} | {userData?.location}</p>
                </div>
                <Badge color="success" pill>Active</Badge>
              </div>
              <p>Profile Completion: {userData?.profileCompletion}%</p>
              <Progress value={userData?.profileCompletion} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'accountOverview' ? 'active' : ''}
            onClick={() => setActiveTab('accountOverview')}
          >
            Account Overview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'apiKeys' ? 'active' : ''}
            onClick={() => setActiveTab('apiKeys')}
          >
            API Keys
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'billing' ? 'active' : ''}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            Security
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="accountOverview">
          <Card className="mt-3">
            <CardBody>
              <h3>Account Overview</h3>
              <p>Email: {userData?.email}</p>
              <p>Location: {userData?.location}</p>
              <Button color="primary">Edit Profile</Button>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="apiKeys">
          <Card className="mt-3">
            <CardBody>
              <h3>API Keys</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Access Key</th>
                    <th>Secret Key</th>
                    <th>Status</th>
                    <th>Create Date</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key: any, index: any) => (
                    <tr key={index}>
                      <td>{key.domain}</td>
                      <td>
                        {key.accessKey}
                        <Button color="link" size="sm" onClick={() => copyToClipboard(key.accessKey)}><Copy size={14} /></Button>
                      </td>
                      <td>
                        {showSecretKey[index] ? key.secretKey : '••••••••••••••••'}
                        <Button color="link" size="sm" onClick={() => toggleSecretKey(index)}>
                          {showSecretKey[index] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                        <Button color="link" size="sm" onClick={() => copyToClipboard(key.secretKey)}><Copy size={14} /></Button>
                      </td>
                      <td><Badge color={key.status === 'Active' ? 'success' : 'danger'}>{key.status}</Badge></td>
                      <td>{key.createDate}</td>
                      <td>{key.expiryDate}</td>
                      <td>
                        <Button color="secondary" size="sm">Actions</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="billing">
          <Card className="mt-3">
            <CardBody>
              <h3>Billing Information</h3>
              <p><strong>Current Plan:</strong> {billingInfo?.currentPlan}</p>
              <p><strong>Price:</strong> {billingInfo?.price}</p>
              <p><strong>Next Billing:</strong> {billingInfo?.nextBillingDate}</p>
              <p><strong>Last Payment:</strong> {billingInfo?.lastPayment}</p>
              <h4 className="mt-4">Billing History</h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Invoice No</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingInfo?.invoices.map((invoice: any, index: any) => (
                    <tr key={index}>
                      <td>{invoice.date}</td>
                      <td>{invoice.invoiceNo}</td>
                      <td>{invoice.description}</td>
                      <td>{invoice.amount}</td>
                      <td><Badge color={invoice.status === 'Paid' ? 'success' : 'warning'}>{invoice.status}</Badge></td>
                      <td><Button color="secondary" size="sm">PDF</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="security">
          <Card className="mt-3">
            <CardBody>
              <h3>Security Settings</h3>
              <h4>Recent Devices</h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Browser</th>
                    <th>Device</th>
                    <th>Location</th>
                    <th>Recent Activity</th>
                    <th>Status</th>
                    <th>IP Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {securitySettings?.recentDevices.map((device: any, index: any) => (
                    <tr key={index}>
                      <td>{device.browser}</td>
                      <td>{device.device}</td>
                      <td>{device.location}</td>
                      <td>{device.recentActivity}</td>
                      <td><Badge color={device.status === 'OK' ? 'success' : 'warning'}>{device.status}</Badge></td>
                      <td>{device.ipAddress}</td>
                      <td><Button color="secondary" size="sm">Actions</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h4 className="mt-4">Two-Factor Authentication (2FA)</h4>
              <Form>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" checked={securitySettings?.twoFactor.biometric} /> Biometric Authentication/Security Key
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" checked={securitySettings?.twoFactor.googleAuth} /> Google Authenticator
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>Email Address Verification</Label>
                  <Input type="email" value={securitySettings?.twoFactor.email} readOnly />
                  <Button color="link">Change</Button>
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number Verification</Label>
                  <Input type="tel" value={securitySettings?.twoFactor.phone} readOnly />
                  <Button color="link">Verify</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </Container>
    </div>
  );
};

export default ClientAccountSecurityComponent;