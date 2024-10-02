import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { Btn, H4, P, Image } from '../../../../../AbstractElements';
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { dynamicImage } from '../../../../../Service';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { api, changeText, Loading } from '../../../../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../ReduxToolkit/Store';
import { getLoggedUserProfile, updateProfile } from '../../../../../ReduxToolkit/Reducers/Change/ProfileSlice';
import moment from 'moment';
import TopLeftToast from '../../../../BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast';
import ContentLoaderEditProfile from './ContentLoaderEditProfile';

registerPlugin(FilePondPluginImagePreview);

const EditProfileForm = () => {
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector((state: RootState) => state.profile.profile);
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const profile = profileData?.data;
  const [file, setFile] = useState([]);
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
  const [domainError, setDomainError] = useState('');

    const validateDomainFormat = (domain: any) => {
        // Regular expression to validate domain format
        const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,})$/;
        return domainRegex.test(domain);
    };

    const checkDomainExistence = async (domain: any) => {
        try {
            const response = await api(`/verify-domain?domain=${domain}`, 'get', false);
            return response.data.exists;
        } catch (error) {
            console.error('Error checking domain existence:', error);
            return false;
        }
    };
    const handleDomainChange = async (e: any) => {
      const domain = e.target.value;
      setUser((prev) => ({ ...prev, company_domain: domain }));

      if (!validateDomainFormat(domain)) {
          setDomainError('Invalid domain format');
          return;
      }

      const exists = await checkDomainExistence(domain);
      if (!exists) {
          setDomainError('Domain does not exist');
      } else {
          setDomainError('');
      }
  };
  const resetUser = () => {
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
  
  const handleFileChange = (fileItems: any) => {
    // Set the file state
    setFile(fileItems.map((fileItem: any) => fileItem.file));
    // Optionally update the user state or handle the file as needed
    if (fileItems.length > 0) {
      setUser((prevState) => ({
        ...prevState,
        file: fileItems[0].file
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        file: null
      }));
    }
  };

  return (
    <Col xl="8">
      <Form onSubmit={handleUpdateProfile}>
        <Card>
          <CardHeaderCommon title="Edit Profile" tagClass={"card-title mb-0"} />
            {
              profileData?.isLoading ?
                <ContentLoaderEditProfile/>
              :
          <CardBody>
            <Row>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text" name='name' placeholder="First Name" value={user?.name} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text"  name='lastname' placeholder="Last Name" value={user?.lastname} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Email</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="email"  name='email' placeholder="Email" value={user?.email} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Phone</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="number"  name='phone' placeholder="Phone" value={user?.phone} />
                </FormGroup>
              </Col>
              <Col md="12">
                  <FormGroup>
                      <Label >{"Address"}</Label>
                      <textarea onChange={(e) => changeText(e, setUser, user)} name='address' value={user?.address} rows={3} className="form-control" defaultValue={"Type your address"} />
                  </FormGroup>
              </Col>
              <Col sm="6" md="4" >
                  <FormGroup>
                      <Label >{"City"}</Label>
                      <Input onChange={(e) => changeText(e, setUser, user)} name='city' value={user?.city} type="text" placeholder="City" />
                  </FormGroup>
              </Col>
              <Col sm="6" md="3" >
                  <FormGroup>
                      <Label >{"PostalCode"}</Label>
                      <Input onChange={(e) => changeText(e, setUser, user)} name='postalcode' value={user?.postalcode} type="number" placeholder="ZIP Code" />
                  </FormGroup>
              </Col>
              <Col md="5">
                  <FormGroup>
                      <Label>{"Country"}</Label>
                      <Input onChange={(e) => changeText(e, setUser, user)} name='country' value={user?.country} type="text" placeholder="Country" />
                  </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Company Name</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text"  name='company_name' placeholder="Company Name" value={user?.company_name} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Company Domain</Label>
                  <Input
                    onChange={handleDomainChange}
                    type="text"
                    name='company_domain'
                    placeholder="Company Domain"
                    value={user.company_domain}
                  />
                  {domainError && <FormText color="danger">{domainError}</FormText>}
                </FormGroup>
              </Col>
              
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Location</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text"  name='location' placeholder="Location" value={user?.location} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <Label>Operator</Label>
                <div className="card-wrapper border rounded-3 checkbox-checked">
                  <div className="radio-form">
                    <FormGroup check>
                      <Input onChange={(e) => changeText(e, setUser, user)} type="radio" id="flexRadioDefault1" name="operator" value="gaming" checked={user?.operator === "gaming"} />
                      <Label for='flexRadioDefault1' check>Gaming</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input onChange={(e) => changeText(e, setUser, user)} type="radio" id="flexRadioDefault2" name="operator" value="non-gaming" checked={user?.operator === "non-gaming"} />
                      <Label for='flexRadioDefault2' check>Non-Gaming</Label>
                    </FormGroup>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
          }
          <CardFooter className="text-end">
            <Btn color="primary" type="submit">{!profileData?.isLoading ? "Update Profile":<Loading/>}</Btn>
          </CardFooter>
        </Card>
      </Form>
      
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Col>
  );
};

export default EditProfileForm;
