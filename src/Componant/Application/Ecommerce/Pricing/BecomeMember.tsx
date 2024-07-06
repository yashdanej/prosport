import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, LI, UL } from '../../../../AbstractElements'
import { BecomeMembers, Href, SignUp } from '../../../../utils/Constant'
import { becomeMemberData } from '../../../../Data/Application/Ecommerce/Pricing'
import axios from 'axios'
import { api } from '../../../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import { createToken } from '../../../../ReduxToolkit/Reducers/Change/Subscribe'
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store'
import BottomRightToast from '../../../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast'
import { useEffect, useState } from 'react'
import TopLeftToast from '../../../BonusUi/Toast/LiveToast/TopLeftToast/TopLeftToast'

const BecomeMember = () => {
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const tokenData = useSelector((state: RootState) => state.subscribe.token);
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

  const handleTry = async () => {
    try {
      // Calculate the expiry date as one month from the current date
      const currentDate = new Date();
      const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      const formattedExpiryDate = expiryDate.toISOString().slice(0, 19).replace('T', ' '); // Formatting as 'YYYY-MM-DD HH:mm:ss'
  
      const data = {
        name: user.name,
        email: user.email,
        expire_date: formattedExpiryDate
      };
  
      // Await the dispatch to ensure it completes before proceeding
      const res = await dispatch(createToken(data));
      console.log("res*784", res);
  
      // Check if the response indicates success
      if (res.payload.status) {
        setTxt(`${user.name} Token Created Successfully`);
        setShowToast(true);
      } else {
        setTxt(`${res.payload}`);
        setShowToast(true);
        console.log("Token creation failed:", res.payload);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  // useEffect(() => {
  // }, [tokenData]);
  
  return (
    <Card>
      <CommonCardHeader title="Subscription Plans" />
      <CardBody className="pricing-block">
        <Row>
          {becomeMemberData.map((item, index) => (
            <Col lg="4" sm="6" className="box-col-3" key={index}>
              <div className="pricingtable">
                <div className="pricingtable-header">
                  <H4 className="title">{item.type}</H4>
                </div>
                <div className="price-value">
                  <span className="amount" style={{fontSize: "1.8rem"}}>{item.price}</span>
                  <p className="duration">per days</p>
                </div>
                <UL className="pricing-content simple-list">
                  {item.benefit.map((data, index) => (
                    <LI key={index}>{data}</LI>
                  ))}
                </UL>
                <div className="pricingtable-signup">
                  {/* <Btn className='mx-2' onClick={HandleSubscribe} tag="a" size="lg" color="primary">Subscribe</Btn> */}
                  <Btn onClick={handleTry} tag="a" size="lg" color="primary">Subscribe</Btn>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
      {showToast && <TopLeftToast txt={txt} isOpen={showToast} />}
    </Card>
  )
}

export default BecomeMember