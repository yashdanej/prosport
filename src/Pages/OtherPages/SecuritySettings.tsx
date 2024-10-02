import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AppDispatch } from '../../ReduxToolkit/Store';
import { changePassoword } from '../../ReduxToolkit/Reducers/Change/ProfileSlice';
import { changeText } from '../../Utils';
import TopLeftToast from '../../Componant/BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast';

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState<any>({ current: false, new: false, confirm: false });

  const dispatch = useDispatch<AppDispatch>();
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!changePassword.currentPassword || !changePassword.newPassword){
      setTxt(`Password field is empty`);
      setShowToast(true);
    }else if(changePassword.newPassword !== changePassword.confirmPassword){
      setTxt(`Password mismatch`);
      setShowToast(true);
    } else{
      try {
        const res = await dispatch(changePassoword(changePassword)).unwrap();
        console.log("res on dis", res);
        setTxt(`${res.message}`);
        setShowToast(true);
        setChangePassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } catch (error) {
        console.log("res on dis err", error);
        setTxt(`${error}`);
        setShowToast(true);
      }
    }
  }

  return (
    <Card>
      <CardBody>
        <h3>Change Password</h3>
        <Form>
                <FormGroup>
                  <Label for="currentPassword">Current Password</Label>
                  <Input 
                    type={showPassword.current ? "text" : "password"} 
                    id="currentPassword" 
                    onChange={(e) => changeText(e, setChangePassword, changePassword)} name='currentPassword' value={changePassword.currentPassword}
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}>
                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label for="newPassword">New Password</Label>
                  <Input 
                    type={showPassword.new ? "text" : "password"} 
                    id="newPassword" 
                    onChange={(e) => changeText(e, setChangePassword, changePassword)} name='newPassword' value={changePassword.newPassword}
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}>
                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm New Password</Label>
                  <Input 
                    type={showPassword.confirm ? "text" : "password"} 
                    id="confirmPassword" 
                    onChange={(e) => changeText(e, setChangePassword, changePassword)} name='confirmPassword' value={changePassword.confirmPassword}
                  />
                  <Button color="link" onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}>
                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </FormGroup>
                <Button color="primary" onClick={handleChangePassword}>Change Password</Button>
              </Form>
      </CardBody>
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Card>
  );
};

export default SecuritySettings;