import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { AppDispatch, RootState } from '../../ReduxToolkit/Store';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../ReduxToolkit/Reducers/Change/ProfileSlice';
import { changeText } from '../../Utils';
import TopLeftToast from '../../Componant/BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState<any>('1');
  const userData = localStorage.getItem("login-user");
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const profileData = useSelector((state: RootState) => state.profile.profile);
  const profile = profileData?.data;
  const [user, setUser] = useState({
    name: profile?.name || "",
    lastname: profile?.lastname || "",
    email: profile?.email || "",
    gender: profile?.gender || "",
    dob: profile?.dob || "",
    location: profile?.location || "",
    phone: profile?.phone || "",
    language: profile?.language || "English",
    skills: profile?.skills || "",
    from: "right",
    image: profile?.image || "",
    company_name: profile?.company_name || "",
    company_domain: profile?.company_domain || "",
    operator: profile?.operator || "",
    address: profile?.address || "",
    city: profile?.city || "",
    postalcode: profile?.postalcode || null,
    country: profile?.country || "",
    gst: profile?.gst || "",
  });
  useEffect(() => {
    if(profileData?.data){
      const profile = profileData?.data;
      setUser({
          name: profile?.name || "",
          lastname: profile?.lastname || "",
          email: profile?.email || "",
          gender: profile?.gender || "",
          dob: profile?.dob || "",
          location: profile?.location || "",
          phone: profile?.phone || "",
          language: profile?.language || "English",
          skills: profile?.skills || "",
          from: "right",
          image: profile?.image || "",
          company_name: profile?.company_name || "",
          company_domain: profile?.company_domain || "",
          operator: profile?.operator || "",
          address: profile?.address || "",
          city: profile?.city || "",
          postalcode: profile?.postalcode || null,
          country: profile?.country || "",
          gst: profile?.gst || "",
      })
  }
}, [profileData.data]);
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<any>({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState<any>({ current: false, new: false, confirm: false });
  const [industry, setIndustry] = useState<any>('');
  const [notification, setNotification] = useState<any>({
    newLogin: true,
    subscription: true,
    apiUsage: true
  });
  const [gstError, setGstError] = useState('');

  // const handleProfileChange = (e: any) => {
  //   setProfile({ ...profile, [e.target.name]: e.target.value });
  // };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(user)).then(() => {
      setTxt(`${user?.name} Profile Updated Successfully`);
      setShowToast(true);
      // resetUser()
    }).catch((error) => {
      setTxt("Error updating profile");
      setShowToast(true);
      // resetUser()
      console.error("Error updating profile:", error);
    });
  };

  const validateGST = (gstNumber: any) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if(gstNumber !== ""){
      if (gstRegex.test(gstNumber)) {
        setGstError(''); // Clear the error if valid
        return true;
      } else {
        setGstError('Invalid GST number');
        return false;
      }
    }else{
      setGstError(''); // Clear the error if valid
      return true;
    }
  };

  const GSTValidation = (e: any, setUser: any, user: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === 'gst') {
      validateGST(value);
    }
  };

  return (
    <Card>
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
      <CardBody>
        <h3>Edit Profile</h3>
        <Form>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">First Name</Label>
                      <Input type="text" name='name' id="name" value={user?.name} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      <Input type="text" name='lastname' id="lastName" value={user?.lastname} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                  <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" value={user?.email} onChange={(e) => changeText(e, setUser, user)} />
                </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input type="tel" name="phone" id="phone" value={user?.phone} onChange={(e) => changeText(e, setUser, user)} />
                </FormGroup>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input type="textarea" name="address" id="address" value={user?.address} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="company_name">Company Name</Label>
                      <Input type="text" name="company_name" id="company_name" value={user?.company_name} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="company_domain">Company Domain</Label>
                      <Input type="text" name="company_domain" id="company_domain" value={user?.company_domain} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                </Row>
               
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input type="text" name="city" id="city" value={user?.city} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="postalcode">Postal Code</Label>
                      <Input type="text" name="postalcode" id="postalcode" value={user?.postalcode} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="country">Country</Label>
                      <Input type="text" name="country" id="country" value={user?.country} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="location">Location</Label>
                      <Input type="text" name="location" id="location" value={user?.location} onChange={(e) => changeText(e, setUser, user)} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="location">GST</Label>
                      <Input type="text" name="gst" id="gst" value={user?.gst} onChange={(e) => GSTValidation(e, setUser, user)} />
                      {gstError && <Alert color="danger">{gstError}</Alert>}
                    </FormGroup>
                  </Col>
                </Row>
                
                {/* <FormGroup tag="fieldset">
                  <legend>Operator Type</legend>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="operator" value="Gaming" checked={user?.operator === 'Gaming'} onChange={(e) => changeText(e, setUser, user)} />{' '}
                      Gaming
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="operator" value="Non-Gaming" checked={user?.operator === 'Non-Gaming'} onChange={(e) => changeText(e, setUser, user)} />{' '}
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