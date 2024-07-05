import { ChangeEvent, useState } from 'react'
import { filesData } from '../../../../Data/Application/FileSideBar/FileSideBar';
import { Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap';
import { Btn, H4, H5 } from '../../../../AbstractElements';
import { FiPlusSquare, FiUpload } from 'react-icons/fi';
import { AddNew, Upload } from '../../../../utils/Constant';
import convertSize from 'convert-size'
import msToTime from '../../../../utils/helper/msToTime';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';

const _RefferContent = () => {
  const refferData = [
    {
      title: "1. Create & validate your referral link and get",
      total: "₹100"
    },
    {
      title: "Customers",
      total: "10%"
    },
    {
      title: "Avg. Value",
      total: "₹500"
    }
  ]
    return (
      <>
        <Card>
        <CommonCardHeader title="How To Use" />
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

export default _RefferContent