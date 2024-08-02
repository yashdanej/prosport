import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Btn, H4, P, Image } from '../../../../../AbstractElements';
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { dynamicImage } from '../../../../../Service';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { changeText, Loading } from '../../../../../Utils';
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
    module: "profile",
    image: profile?.image || "",
    company_name: profile?.company_name || "",
    company_domain: profile?.company_domain || "",
    operator: profile?.operator || ""
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
            module: "profile",
            image: profile?.image || "",
            company_name: profile?.company_name || "",
            company_domain: profile?.company_domain || "",
            operator: profile?.operator || ""
        })
    }
  }, [profileData.data]);
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
      module: "profile",
      image: profile?.image || "",
      company_name: profile?.company_name || "",
      company_domain: profile?.company_domain || "",
      operator: profile?.operator || ""
    })
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile(user)).then(() => {
      setTxt(`${user?.name} Profile Updated Successfully`);
      setShowToast(true);
      resetUser()
    }).catch((error) => {
      setTxt("Error updating profile");
      setShowToast(true);
      resetUser()
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
  const fetchUser = () => {
    dispatch(getLoggedUserProfile());
  }
  useEffect(() => {
    console.log("user", user);
  }, [user]);
    useEffect(() => {
      fetchUser();
    }, []);

  return (
    <Col xl="12">
      <Form onSubmit={handleUpdateProfile}>
        <Card>
          <CardHeaderCommon title="Edit Profile" tagClass={"card-title mb-0"} />
            {
              profileData?.isLoading ?
                <ContentLoaderEditProfile/>
              :
          <CardBody>
            <Row>
              <div className="profile-title">
                <div className='d-flex'>
                  <Image className="img-70 rounded-circle" style={{objectFit: "cover", height: "70px"}} alt="edit-user" src={user?.image} />
                  <div className='flex-grow-1'>
                    <H4 className="mb-1">{parsedUserData?.user?.name}</H4>
                    <P>Operator</P>
                  </div>
                </div>
              </div>
              <Col lg="12">
                <FormGroup>
                  <FilePond
                    files={file}
                    allowMultiple={false}
                    maxFiles={1}
                    labelIdle={'Drag & Drop your profile pic or <span class="filepond--label-action text-danger text-decoration-none">Browse</span>'}
                    onupdatefiles={handleFileChange}
                  />
                </FormGroup>
              </Col>
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
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Company Name</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text"  name='company_name' placeholder="Company Name" value={user?.company_name} />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Company Domain</Label>
                  <Input onChange={(e) => changeText(e, setUser, user)} type="text"  name='company_domain' placeholder="Company Domain" value={user?.company_domain} />
                </FormGroup>
              </Col>
              
              {/* <Col sm="6" md="6">
                <FormGroup>
                  <Label>DOB</Label>
                  <Input 
                    onChange={(e) => changeText(e, setUser, user)} 
                    type="date"  
                    name='dob' 
                    placeholder="DOB" 
                    value={user?.dob ? moment(user.dob).format('YYYY-MM-DD') : ''} 
                  />
                </FormGroup>
              </Col> */}
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
