import { Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Btn, H4, H6, Image, P } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'
import { Bio, Emailaddress, MyProfile, Password, Save, Website } from '../../../../../utils/Constant'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { FilePond } from 'react-filepond'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../../ReduxToolkit/Store'
import { updateProfile, updateProfileImage } from '../../../../../ReduxToolkit/Reducers/Change/ProfileSlice'
import { changeText } from '../../../../../Utils'
import TopLeftToast from '../../../../BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast'

const EditMyProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const userData = localStorage.getItem("login-user");
  const [user, setUser] = useState<any>({});
  const [aboutcompany, setAboutcompany] = useState('');
  const profileData = useSelector((state: RootState) => state.profile.profile);
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const [file, setFile] = useState([]);
  const handleFileChange = (fileItems: any) => {
    // Set the file state
    
    setFile(fileItems.map((fileItem: any) => fileItem.file));
    // Optionally update the user state or handle the file as needed
    if (fileItems.length > 0) {
    console.log("fileItems", fileItems[0].file);
      setUser((prevState: any) => ({
        ...prevState,
        image: fileItems[0].file
      }));
    } else {
      setUser((prevState: any) => ({
        ...prevState,
        image: null
      }));
    }
  };
  const SaveImage = () => {
    console.log("file0", file);
    dispatch(updateProfileImage({module: "profile", file: file[0]}));
    setTxt(`Image Updated Successfully`);
    setShowToast(true);
  }
  useEffect(() => {
    if(profileData?.data){
      const profile = profileData?.data;
      setUser({
          image: profile?.image || "",
      });
      setAboutcompany(profile?.aboutcompany)
  }
}, [profileData.data]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile({from: 'left', aboutcompany: aboutcompany})).then(() => {
      setTxt(`Profile Updated Successfully`);
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
  console.log("usrs", user);
  console.log("file", file);
}, [user, file]);

  return (
    <Col xl="4">
      <Card>
        <CardHeaderCommon title={MyProfile} tagClass='card-title mb-0' />
        <CardBody>
          <Form onSubmit={(event) => event.preventDefault()}>
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
              {
                file.length>0 && <div className='flex justify-content-end'><Btn onClick={SaveImage} color="primary" type="submit">Save Image</Btn></div>
              }
            {/* <Row className="mb-2">
              <div className="profile-title">
                <div className='d-flex'>
                  <Image className="img-70 rounded-circle" alt="edit-user" src={dynamicImage("user/7.jpg")} />
                  <div className='flex-grow-1'>
                    <H4 className="mb-1">{parsedUserData?.user?.name}</H4>
                    <P>Operator</P>
                  </div>
                </div>
              </div>
            </Row> */}
            <FormGroup>
              <H6 className="form-label">{"About Company"}</H6>
              <textarea onChange={(e) => setAboutcompany(e.target.value)} name='aboutcompany' value={aboutcompany} rows={5} className="form-control" defaultValue={"On the other hand, we denounce with righteous indignation"} />
            </FormGroup>
            {/* <FormGroup>
              <Label>{Emailaddress}</Label>
              <Input placeholder="your-email@domain.com" />
            </FormGroup>
            <FormGroup>
              <Label>{Website}</Label>
              <Input placeholder="http://Uplor.com" />
            </FormGroup>
            <div className="form-footer">
              <Btn color="primary" className="d-block">{Save}</Btn>
            </div> */}
                  <Row>
                      <Col sm="12" md="12" >
                          <FormGroup>
                              <Label >Old Password</Label>
                              <Input type="text" placeholder="Old Password" />
                          </FormGroup>
                      </Col>
                      <Col sm="12" md="12" >
                          <FormGroup>
                              <Label >New Password</Label>
                              <Input type="text" placeholder="New Password" />
                          </FormGroup>
                      </Col>
                      <Col sm="12" md="12" >
                          <FormGroup>
                              <Label >Confirm Password</Label>
                              <Input type="email" placeholder="Confirm Password" />
                          </FormGroup>
                      </Col>
                  </Row>
              <CardFooter className="text-end">
                  <Btn onClick={handleUpdateProfile} color="primary" type="submit">Save</Btn>
              </CardFooter>
          </Form>
        </CardBody>
      </Card>
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Col>
  )
}

export default EditMyProfile