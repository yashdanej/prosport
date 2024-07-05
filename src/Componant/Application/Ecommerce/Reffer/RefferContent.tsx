import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, H5, LI, UL } from '../../../../AbstractElements'
import { BecomeMembers, Href, SignUp } from '../../../../utils/Constant'
import { becomeMemberData } from '../../../../Data/Application/Ecommerce/Pricing'

const RefferContent = () => {
  const refferData = [
    {
      title: "Earning",
      total: "₹9876544"
    },
    {
      title: "Customers",
      total: "₹9876544"
    },
    {
      title: "Avg. Value",
      total: "₹9876544"
    },
    {
      title: "Refund Rate",
      total: "9876544%"
    } 
  ]
  return (
    <>
      <Card>
        <CommonCardHeader title="Referral Program" />
        <CardBody className="pricing-block">
          <p>Track and find all the details about our referral program, your stats and revenues.</p>
          <Row>
            {refferData.map((item, index) => (
              <Col lg="3" sm="6" className="box-col-3" key={index}>
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H4 className="title">{item.title}</H4>
                  </div>
                  {/* <div className="price-value">
                    <span className="amount" style={{fontSize: "1.8rem"}}>{item.price}</span>
                    <p className="duration">per days</p>
                  </div> */}
                  <H5 className="title">{item.total}</H5>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default RefferContent