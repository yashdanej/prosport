import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Btn, H4 } from '../../../AbstractElements';
import { useLocation } from 'react-router-dom';

const Commingsoon = () => {
    const location = useLocation();
    const title = location.pathname.split("/")[2];
    const apiData = [
        {
          title: title,
          desc: "This is the description for the shop. It includes all the details about what the shop offers, the types of products available, and any other relevant information.",
          btn: "Comming Soon"
        },
      ];
  return (
    <div className='page-body'>
      <Card>
        <CommonCardHeader title={title} />
        <CardBody className="pricing-block">
          <Row>
            {apiData.map((item, index) => (
              <Col lg="12" sm="12" className="box-col-3" key={index}>
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H4 className="title">{item.title}</H4>
                  </div>
                  <p className="duration">{item.desc}</p>
                  <div className="pricingtable-signup">
                    <Btn tag="a" size="lg" color="primary" href="#">{item.btn}</Btn>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default Commingsoon
