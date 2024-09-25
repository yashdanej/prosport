import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { User, Lock, Briefcase, Clock, Upload, Eye, EyeOff } from 'lucide-react';

const SettingsComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('1');
  const [profile, setProfile] = useState<any>({
    firstName: 'mithun',
    lastName: '',
    email: 'developer@demo.com',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    companyName: '',
    companyDomain: '',
    location: '',
    operator: 'Gaming'
  });
  const [password, setPassword] = useState<any>({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState<any>({ current: false, new: false, confirm: false });
  const [industry, setIndustry] = useState<any>('');
  const [notification, setNotification] = useState<any>({
    newLogin: true,
    subscription: true,
    apiUsage: true
  });
  const [changelogItems, setChangelogItems] = useState<any>([]);

  useEffect(() => {
    // Fetch changelog data
    fetchChangelog();
  }, []);

  const fetchChangelog = () => {
    // Simulated API call
    const mockChangelog = [
      { version: '1.2.0', date: '2024-05-15', changes: ['Added new cricket statistics', 'Improved API response time'] },
      { version: '1.1.5', date: '2024-04-01', changes: ['Bug fixes', 'Updated documentation'] },
      { version: '1.1.0', date: '2024-03-10', changes: ['Introduced football live scores', 'Enhanced user dashboard'] },
    ];
    setChangelogItems(mockChangelog);
  };

  const handleProfileChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e: any) => {
    setNotification({ ...notification, [e.target.name]: e.target.checked });
  };

  const handleUpdateProfile = () => {
    // Implement profile update logic
    console.log('Updated profile:', profile);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log('Password change requested');
    alert('Password changed successfully!');
  };

  const handleIndustryChange = (e: any) => {
    setIndustry(e.target.value);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Settings</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => setActiveTab('1')}
          >
            <User size={18} className="me-2" />
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => setActiveTab('2')}
          >
            <Lock size={18} className="me-2" />
            Authentication
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => setActiveTab('3')}
          >
            <Briefcase size={18} className="me-2" />
            Industry
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '4' ? 'active' : ''}
            onClick={() => setActiveTab('4')}
          >
            <Clock size={18} className="me-2" />
            Changelog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '5' ? 'active' : ''}
            onClick={() => setActiveTab('5')}
          >
            <Clock size={18} className="me-2" />
              Notification
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <h3>Edit Profile</h3>
              <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <Input type="text" name="firstName" id="firstName" value={profile.firstName} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      <Input type="text" name="lastName" id="lastName" value={profile.lastName} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                  <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" value={profile.email} onChange={handleProfileChange} />
                </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input type="tel" name="phone" id="phone" value={profile.phone} onChange={handleProfileChange} />
                </FormGroup>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input type="textarea" name="address" id="address" value={profile.address} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="companyName">Company Name</Label>
                      <Input type="text" name="companyName" id="companyName" value={profile.companyName} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="companyDomain">Company Domain</Label>
                      <Input type="text" name="companyDomain" id="companyDomain" value={profile.companyDomain} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                </Row>
               
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input type="text" name="city" id="city" value={profile.city} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="postalCode">Postal Code</Label>
                      <Input type="text" name="postalCode" id="postalCode" value={profile.postalCode} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="country">Country</Label>
                      <Input type="text" name="country" id="country" value={profile.country} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="location">Location</Label>
                      <Input type="text" name="location" id="location" value={profile.location} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="location">GST</Label>
                      <Input type="text" name="gst" id="gst" value={profile.gst} onChange={handleProfileChange} />
                    </FormGroup>
                  </Col>
                </Row>
                
                {/* <FormGroup tag="fieldset">
                  <legend>Operator Type</legend>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="operator" value="Gaming" checked={profile.operator === 'Gaming'} onChange={handleProfileChange} />{' '}
                      Gaming
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="operator" value="Non-Gaming" checked={profile.operator === 'Non-Gaming'} onChange={handleProfileChange} />{' '}
                      Non-Gaming
                    </Label>
                  </FormGroup>
                </FormGroup> */}
                <Button color="primary" onClick={handleUpdateProfile}>Update Profile</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <Card>
            <CardBody>
              <h3>Change Password</h3>
              <Form>
                <FormGroup>
                  <Label for="currentPassword">Current Password</Label>
                  <Input 
                    type={showPassword.current ? "text" : "password"} 
                    name="current" 
                    id="currentPassword" 
                    value={password.current} 
                    onChange={handlePasswordChange} 
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}>
                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label for="newPassword">New Password</Label>
                  <Input 
                    type={showPassword.new ? "text" : "password"} 
                    name="new" 
                    id="newPassword" 
                    value={password.new} 
                    onChange={handlePasswordChange} 
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}>
                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm New Password</Label>
                  <Input 
                    type={showPassword.confirm ? "text" : "password"} 
                    name="confirm" 
                    id="confirmPassword" 
                    value={password.confirm} 
                    onChange={handlePasswordChange} 
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}>
                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <Button color="primary" onClick={handleChangePassword}>Change Password</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="3">
          <Card>
            <CardBody>
              <h3>Select Industry</h3>
              <FormGroup>
                <Label for="industry">Industry</Label>
                <Input type="select" name="industry" id="industry" value={industry} onChange={handleIndustryChange}>
                  <option value="">Select an industry</option>
                  <option value="sports">Sports</option>
                  <option value="betting">Betting</option>
                  <option value="media">Media</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </Input>
              </FormGroup>
              <Button color="primary" onClick={() => alert(`Industry set to: ${industry}`)}>Save Industry</Button>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="4">
          <Card>
            <CardBody>
              <h3>Changelog</h3>
              <ListGroup>
                {changelogItems.map((item: any, index: any) => (
                  <ListGroupItem key={index}>
                    <h5>
                      <Badge color="primary" pill>v{item.version}</Badge>
                      <small className="text-muted ml-2">{item.date}</small>
                    </h5>
                    <ul>
                      {item.changes.map((change: any, changeIndex: any) => (
                        <li key={changeIndex}>{change}</li>
                      ))}
                    </ul>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="5">
          <Card className="mt-4">
            <CardBody>
              <h3>Notification Preferences</h3>
              <Form>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="newLogin" checked={notification.newLogin} onChange={handleNotificationChange} />{' '}
                    Notify on new login
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="subscription" checked={notification.subscription} onChange={handleNotificationChange} />{' '}
                    Notify when subscription expires
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="apiUsage" checked={notification.apiUsage} onChange={handleNotificationChange} />{' '}
                    Notify when API usage is about to reach limit
                  </Label>
                </FormGroup>
                <Button color="primary" className="mt-3" onClick={() => alert('Notification preferences updated!')}>Save Preferences</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </Container>
    </div>
  );
};

export default SettingsComponent;