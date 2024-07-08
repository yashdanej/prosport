import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, H5, LI, UL } from '../../../../AbstractElements'
import { BecomeMembers, Href, SignUp } from '../../../../utils/Constant'
import { becomeMemberData } from '../../../../Data/Application/Ecommerce/Pricing'
import { useDispatch, useSelector } from 'react-redux'
import { getRefferer } from '../../../../ReduxToolkit/Reducers/Change/AuthSlice'
import { getCommission } from '../../../../ReduxToolkit/Reducers/Change/Subscribe'
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store'
import { useEffect } from 'react'

const RefferContent = () => {
  const commissionData = useSelector((state: RootState) => state.subscribe.commission);
  const reffererData = useSelector((state: RootState) => state.auth.refferer);
  const dispatch = useDispatch<AppDispatch>();

  const fetchRefferer = () => {
    dispatch(getRefferer());
  }

  const fetchCommission = () => {
    dispatch(getCommission());
  }
  const refferData = [
    // {
    //   title: "Earning",
    //   total: `₹${}`
    // },
    // {
    //   title: "Customers",
    //   total: "₹9876544"
    // }
  ]
  useEffect(() => {
    fetchRefferer();
    fetchCommission();
  }, [dispatch]);
  return (
    <>
      <Card>
        <CommonCardHeader title="Referral Program" />
        <CardBody className="pricing-block">
          <p>Track and find all the details about our referral program, your stats and revenues.</p>
          <Row>
            {/* {refferData.map((item, index) => ( */}
              <Col lg="3" sm="6" className="box-col-3">
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H4 className="title">Earning</H4>
                  </div>
                  {/* <div className="price-value">
                    <span className="amount" style={{fontSize: "1.8rem"}}>{item.price}</span>
                    <p className="duration">per days</p>
                  </div> */}
                  <H5 className="title">₹{commissionData?.data?.totalCommission || 0}</H5>
                </div>
              </Col>
            {/* ))} */}
            <Col lg="3" sm="6" className="box-col-3">
              <div className="pricingtable">
                <div className="pricingtable-header">
                  <H4 className="title">Reference</H4>
                </div>
                {/* <div className="price-value">
                  <span className="amount" style={{fontSize: "1.8rem"}}>{item.price}</span>
                  <p className="duration">per days</p>
                </div> */}
                <H5 className="title">{reffererData?.data?.length || 0}</H5>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default RefferContent