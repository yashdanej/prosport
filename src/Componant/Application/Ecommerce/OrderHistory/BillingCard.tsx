import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { totalStudentData } from '../../../../Data/Dashboard/EducationData'
import { H2, Image, P } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../ReduxToolkit/Store'

const BillingCard = () => {
     // const data = !analytics?totalStudentData:totalStudentData2
  const apiKeyData = useSelector((state: RootState) => state.subscribe.api_keys);
  
  const plansData = useSelector((state: RootState) => state.subscribe.plans);
  const data = [
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data[0]?.planId)?.api_calls,
      title:"Total Hits",
      color:"danger",
      icon:"down",
      bg: "rgb(150 98 229)",
      percentage:"- 17.06%",
      detail:"than last 6 Month",
      image:"student.png",
      class:"student"
    },
    {
      hits: apiKeyData?.data[0]?.api_hits,
      title:"Used Hits",
      color:"danger",
      icon:"down",
      bg: "rgb(132 219 255)",
      percentage:"- 17.06%",
      detail:"than last 6 Month",
      image:"student.png",
      class:"student"
    },
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data[0]?.planId)?.api_calls - apiKeyData?.data[0]?.api_hits,
      title:"Remaining Hits",
      color:"danger",
      icon:"down",
      bg: "rgb(132 219 255)",
      percentage:"- 17.06%",
      detail:"than last 6 Month",
      image:"student.png",
      class:"student"
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
                      <H2>{data.hits}</H2>
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
