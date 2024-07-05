import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5 } from '../../../../AbstractElements'

const TopRefferedUsers = () => {
  return (
    <Card>
        <CommonCardHeader title="Top Referred Users" />
        <CardBody className="pricing-block">
        <p>You haven't referred anyone yet.</p>
          {/* <Row>
            {refferData.map((item, index) => (
              <Col lg="4" sm="6" className="box-col-3" key={index}>
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H5 className="title p-2">{item.title}</H5>
                  </div>
                  
                  <H5 className="title">{item.btn}</H5>
                </div>
              </Col>
            ))}
          </Row> */}
        </CardBody>
      </Card>
  )
}

export default TopRefferedUsers
