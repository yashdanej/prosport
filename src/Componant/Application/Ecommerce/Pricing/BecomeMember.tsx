import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H4, LI, UL } from '../../../../AbstractElements'
import { BecomeMembers, Href, SignUp } from '../../../../utils/Constant'
import { becomeMemberData } from '../../../../Data/Application/Ecommerce/Pricing'

const BecomeMember = () => {
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
                  <Btn tag="a" size="lg" color="primary" href="#">Try Me</Btn>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default BecomeMember