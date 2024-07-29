import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { totalStudentData } from '../../../../Data/Dashboard/EducationData'
import { H2, Image, P } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'

const BillingCard = () => {
    const data = [
        {
            student:"42,954",
            title:"Total Hits",
            color:"danger",
            icon:"down",
            bg: "rgb(150 98 229)",
            percentage:"- 17.06%",
            detail:" than last 6 Month",
            image:"student.png",
            class:"student"
        },
        {
            student:"659",
            title:"Used Hits",
            color:"success",
            icon:"up",
            bg: "rgb(132 219 255)",
            percentage:"+27.02%",
            detail:"than last 4 Month",
            image:"teacher.png",
            class:"student-2"
        },
        {
            student:"984",
            title:"Remaining hits",
            color:"success",
            icon:"up",
            bg: "rgb(132 219 255)",
            percentage:"+ 12.01%",
            detail:"than last 8 Month",
            image:"calendar.png",
            class:"student-3"
        },
        {
            student:"984",
            title:"Remaining hits",
            color:"success",
            icon:"up",
            bg: "rgb(132 219 255)",
            percentage:"+ 12.01%",
            detail:"than last 8 Month",
            image:"calendar.png",
            class:"student-3"
        },
    ]
  return (
    <>
        <Col xl={12} md="12" className="proorder-md-1">
        <Row>
          {data.map((data, i) => (
            <Col xl="3" sm="6" key={i}>
              <Card style={{background: data.bg}}>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="flex-grow-1">
                      <P className="mb-0 text-truncate"> {data.title}</P>
                      <H2>{data.student}</H2>
                      <div className="d-flex student-arrow text-truncate">
                        <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                          <i className={`icon-arrow-${data.icon} font-${data.color}`} />
                        </P>
                        <span className={`f-w-500 font-${data.color}`}>{data.percentage}</span>
                        {data.detail}
                      </div>
                    </div>
                    <div className="flex-grow-2">
                        <Image
                          src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                          alt="student"
                        />:
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  )
}

export default BillingCard
