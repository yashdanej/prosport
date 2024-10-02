import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { AppDispatch, RootState } from '../../ReduxToolkit/Store';
import TopLeftToast from '../../Componant/BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast';
import { updateProfile } from '../../ReduxToolkit/Reducers/Change/ProfileSlice';
import { changeText } from '../../Utils';

const Industry = () => {
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
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <Card>
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
      <CardBody>
        <h3>Industry</h3>
        <FormGroup>
          <Label for="industry">Industry</Label>
          <Input type="select" name="operator" id="industry" onChange={(e) => changeText(e, setUser, user)}>
            <option value="">Select an industry</option>
            <option selected={user.operator === "Gaming"} value="Gaming">Gaming</option>
            <option selected={user.operator === "Non-Gaming"} value="Non-Gaming">Non-Gaming</option>
          </Input>
        </FormGroup>
        <Button color="primary" onClick={handleUpdateProfile}>Save Industry</Button>
      </CardBody>
    </Card>
  );
};

export default Industry;