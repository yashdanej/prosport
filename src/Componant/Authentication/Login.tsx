import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H3, H4, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import { CreateAccount, DoNotAccount, EmailAddress, ForgotPassword, Href, Password, RememberPassword, SignIn, SignInAccount, SignInWith } from "../../utils/Constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SocialApp from "./SocialApp";
import { login } from "../../ReduxToolkit/Reducers/Change/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../ReduxToolkit/Store";
import { Loading } from "../../Utils";
import BottomRightToast from "../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("test123@gmail.com");
    const [password, setPassword] = useState("Test@123");
    const [showToast, setShowToast] = useState(false);
    const [txt, setTxt] = useState("");
    const userData = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  
    const SimpleLoginHandle = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {
        email: email,
        password: password
      }
      try {
        if(email === "" || password === ""){
          setTxt("Both fields are required");
          setShowToast(true);
        }else{
          const res = await dispatch(login(data)).unwrap();
          console.log("res---- login", res);
          const userJsonString = JSON.stringify({ user: res.data, token: res.token });
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem("login-user", userJsonString);
          navigate(`${process.env.PUBLIC_URL}/dashboard/ecommerce`);
          // Handle successful signup, e.g., redirect to another page or show a success message
        }
      } catch (error) {
        console.error("Signup error:", error);
        setTxt("Invalid email or password");
        setShowToast(true);
      }
    };

    useEffect(() => {
      console.log("email, password", email, password);
    }, [email, password]);
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <div>
              <div>
                <Link className="logo text-center" to={Href}>
                  <Image className="img-fluid for-light" src={dynamicImage("logo/logo.png")} alt="looginpage" />
                  <Image className="img-fluid for-dark" src={dynamicImage("logo/logo_dark.png")} alt="looginpage" />
                </Link>
              </div>
              <div className="login-main">
                <Form className="theme-form" onSubmit={(e) => SimpleLoginHandle(e)} >
                  <H3>{SignInAccount}</H3>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input autoComplete="off" type="email" required placeholder="Test@gmail.com" value={email} name="email" onChange={(event) => setEmail(event.target.value)}  />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input autoComplete="off" type={show ? "text" : "password"} placeholder="*********"  onChange={(event) => setPassword(event.target.value)} value={password} name="password"/>
                      <div className="show-hide" onClick={() => setShow(!show)}>
                        <span className="show"> </span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-0 form-sub-title">
                    <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <Link to={`${process.env.PUBLIC_URL}/authentication/forget_password`}  >
                      {ForgotPassword}
                    </Link>
                    <div className="text-end mt-3">
                      <Btn color="primary" block  className="w-100" >
                      {userData.isLoading?<Loading/>:"SignIn"}
                      </Btn>
                    </div>
                  </FormGroup>
                  <H4 className="text-muted mt-4 or">{SignInWith}</H4>
                  <SocialApp />
                  <P className="mt-4 mb-0 text-center">
                    {DoNotAccount}
                    <Link className="ms-2" to={`${process.env.PUBLIC_URL}/authentication/register_simple`} >
                      {CreateAccount}
                    </Link>
                  </P>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {showToast && <BottomRightToast txt={txt} isOpen={showToast} />}
    </Container>
  );
};

export default Login;
