import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const SecuritySettings = () => {
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

  const handlePasswordChange = (e: any) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log('Password change requested');
    alert('Password changed successfully!');
  };
  return (
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
  );
};

export default SecuritySettings;