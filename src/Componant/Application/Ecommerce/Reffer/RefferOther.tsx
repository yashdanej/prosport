import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5 } from '../../../../AbstractElements'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../ReduxToolkit/Store'

const RefferOther = () => {
  const refferData = [
        {
            title: "User #hashtag in a photo on social media and get $10 for each purchase you make.",
            btn: "Read More"
        },
        {
            title: "Send the invitation link to 10 friends and get a 50% coupon to use on any purchase.",
            btn: "Read More"
        },
        {
            title: "User #hashtag in a photo on social media and get $10 for each purchase you make.",
            btn: "Read More"
        }
    ]
  return (
    <Card>
        <CommonCardHeader title="Other programs" />
        <CardBody className="pricing-block">
          <Row>
            {refferData.map((item, index) => (
              <Col lg="4" sm="6" className="box-col-3" key={index}>
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H5 className="title p-2">{item.title}</H5>
                  </div>
                  {/* <div className="price-value">
                    <span className="amount" style={{fontSize: "1.8rem"}}>{item.price}</span>
                    <p className="duration">per days</p>
                  </div> */}
                  <H5 className="title">{item.btn}</H5>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
  )
}

export default RefferOther
