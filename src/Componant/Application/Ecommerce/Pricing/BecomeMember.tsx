import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, LI, UL } from '../../../../AbstractElements'
import { BecomeMembers, Href, SignUp } from '../../../../utils/Constant'
import { becomeMemberData } from '../../../../Data/Application/Ecommerce/Pricing'
import axios from 'axios'
import { api } from '../../../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import { createToken, getSubscribe } from '../../../../ReduxToolkit/Reducers/Change/Subscribe'
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store'
import BottomRightToast from '../../../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast'
import { useEffect, useState } from 'react'
import TopLeftToast from '../../../BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast'
import ContentLoaderBecomeMember from './ContentLoaderBecomeMember'

const BecomeMember = () => {
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const tokenData = useSelector((state: RootState) => state.subscribe.token);
  const plansData = useSelector((state: RootState) => state.subscribe.plans);
  const dispatch = useDispatch<AppDispatch>();
  const storedUser: any = localStorage.getItem("login-user");
  console.log('storedUser', storedUser);
  const { user } = JSON.parse(storedUser);
  const HandleSubscribe = async () =>{
    let data = {
      name: user.name,
      email: user.email,
      price: 1,
      phone:'9999999999',
      user_id: 'MID' + Date.now(),
    }
    try {

      await axios.post('http://localhost:3000/api/v1/order', data).then(res =>{

      if(res.data.data.success){
        window.location.href = res.data.data.data.instrumentResponse.redirectInfo.url
      }

      }).catch(err =>{
        console.log(err)
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleTry = async (id: number) => {
    const data = {
      id: id,
      name: user.name,
      email: user.email,
    };
    
    try {
      // Await the dispatch to ensure it completes before proceeding
      const res = await dispatch(createToken(data)).unwrap();
      console.log("res", res);
      
      // Check if the response indicates success
      if (res?.message) {
        setTxt(`${user.name} Token Created Successfully`);
        setShowToast(true);
      } else {
        setTxt(`${res.payload}`);
        setShowToast(true);
        console.log("Token creation failed:", res.payload);
      }
    } catch (error: any) {
      console.log("error in subscription", error);
      setTxt(`${user.name} ${error}`);
      setShowToast(true);
    }
  }
  
  const fetchPlans = () => {
    dispatch(getSubscribe());
  }

  useEffect(() => {
    fetchPlans();
  }, [dispatch]);

  
  return (
    <Card>
      <CommonCardHeader title="Subscription Plans" />
      <CardBody className="pricing-block">
        <Row>
          { plansData?.isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <Col lg="4" sm="6" className="box-col-3" key={index}>
                <ContentLoaderBecomeMember />
              </Col>
            ))
          ):
          plansData && plansData?.data?.map((item:any, index: number) => (
            <Col lg="4" sm="6" className="box-col-3 mb-4" key={index}>
              <div className="pricingtable">
                <div className="pricingtable-header">
                  <H4 className="title">{item.name}</H4>
                </div>
                <div className="price-value">
                  <span className="amount" style={{fontSize: "1.8rem"}}>${item.amount}/{item.validity.split(" ")[0]}</span>
                  <p className="duration">per days</p>
                </div>
                <UL className="pricing-content simple-list">
                    <LI>API calls : {item.api_call}</LI>
                    <LI>Deliver : API pull</LI>
                    <LI>Maintenance</LI>
                </UL>
                <div className="pricingtable-signup">
                  {/* <Btn className='mx-2' onClick={HandleSubscribe} tag="a" size="lg" color="primary">Subscribe</Btn> */}
                  <Btn onClick={() => {handleTry(item.id)}} tag="a" size="lg" color="primary">Subscribe</Btn>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
      {showToast && <TopLeftToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Card>
  )
}

export default BecomeMember