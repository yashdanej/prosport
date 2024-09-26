import React, { useState } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const ProfileSettings = () => {
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

  const handleProfileChange = (e: any) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    // Implement profile update logic
    console.log('Updated profile:', profile);
    alert('Profile updated successfully!');
  };

  return (
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
  );
};

export default ProfileSettings;