import React, { useEffect, useState } from 'react';
import CommonLogo from './CommonLogo';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Btn, H4, H6, P } from '../../../../AbstractElements';
import { AgreeWith, CreateAccount, CreateYourAccount, EmailAddress, EmailsPlaceHolder, FacebookHeading, Href, LinkedInHeading, Password, PrivacyPolicy, SignIn, SignUpWith, TwitterHeading, YourName } from '../../../../utils/Constant';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Linkedin, Twitter } from 'react-feather';
import { CommonFormPropsType } from '../../../../Types/OtherPages/OtherPages';
import { changeText, Loading } from '../../../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../../ReduxToolkit/Reducers/Change/AuthSlice';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import BottomRightToast from '../../../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast';

const CommonRegisterForm = ({ alignLogo }: CommonFormPropsType) => {
  const location = useLocation();
  let refferCode = ''
  refferCode = location.pathname.split("/")[3];
  const [showPassWord, setShowPassWord] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reffer_code: refferCode === '' ? '' : refferCode,
  });
  const userData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  const resetField = () => {
    setUser({
      name: '',
      email: '',
      password: '',
      reffer_code: '',
    });
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.name === '' || user.email === '' || user.password === '') {
        setTxt("* fields are required");
        setShowToast(true); // Show toast for required fields
      } else {
        const registerRes = await dispatch(signup(user)).unwrap();
        console.log("registerRes", registerRes);
        resetField();
        navigate(`${process.env.PUBLIC_URL}/login`);
        // Handle successful signup, e.g., redirect to another page or show a success message
      }
    } catch (error: any) {
      console.log('Signup error:', error);
      setTxt(error.error);
      setShowToast(true); // Show toast for required fields
      // Handle signup error, e.g., show an error message
    }
  };

  return (
    <div className="login-card login-dark">
      <div>
        <div>
          <CommonLogo alignLogo={alignLogo} />
        </div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={(event) => event.preventDefault()}>
            <H4>{CreateYourAccount}</H4>
            <P>{"Enter your personal details to create account"}</P>
            <FormGroup>
              <Label className="col-form-label pt-0">{YourName}*</Label>
              <Row className="g-2">
                <Col xs="12">
                  <Input type="text" onChange={(e) => changeText(e, setUser, user)} value={user.name} name="name" autoComplete="off" required placeholder="" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">{EmailAddress}*</Label>
              <Input type="email" onChange={(e) => changeText(e, setUser, user)} value={user.email} name="email" autoComplete="off" required placeholder={"Your email"} />
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">{Password}*</Label>
              <div className="form-input position-relative">
                <Input type={showPassWord ? "text" : "password"} onChange={(e) => changeText(e, setUser, user)} value={user.password} name="password" autoComplete="off" placeholder="*********" required />
                <div className="show-hide">
                  <span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} />
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">Referral Code</Label>
              <Input type="email" onChange={(e) => changeText(e, setUser, user)} value={user.reffer_code} name="reffer_code" autoComplete="off" placeholder="Optional" />
            </FormGroup>
            <FormGroup className="mb-0">
              <div className="checkbox p-0">
                <Input id="checkbox1" type="checkbox" />
                <Label className="text-muted" htmlFor="checkbox1">{AgreeWith}<Link className="ms-2" to={Href}>{PrivacyPolicy}</Link></Label>
              </div>
              <Btn onClick={handleCreateAccount} block color="primary" className="w-100">{userData.isLoading ? <Loading /> : "Create Account"}</Btn>
            </FormGroup>
            <H6 className="text-muted mt-4 or">{SignUpWith}</H6>
            {/* <div className="social mt-4">
              <div className="btn-showcase">
                <Link className="btn btn-light" to="https://www.linkedin.com/login" target="_blank" rel="noreferrer">
                  <Linkedin className="txt-linkedin" />{LinkedInHeading}
                </Link>
                <Link className="btn btn-light" to="https://twitter.com/login?lang=en" target="_blank" rel="noreferrer">
                  <Twitter className="txt-twitter" />{TwitterHeading}
                </Link>
                <Link className="btn btn-light" to="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  <Facebook className="txt-fb" />{FacebookHeading}
                </Link>
              </div>
            </div> */}
            <P className="mt-4 mb-0">{"Already have an account?"}<Link className="ms-2" to={`${process.env.PUBLIC_URL}/authentication/loginsimple`}>{SignIn}</Link></P>
          </Form>
        </div>
      </div>
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </div>
  );
};

export default CommonRegisterForm;
