import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { totalStudentData } from "../../../Data/Dashboard/EducationData";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";

const MasterDashboard = () => {
  const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);
  console.log("dashData", dashData);
  const [topCards, setTopCards]: any = useState([]);
  useEffect(() => {
    setTopCards(
      [
      {
        student: dashData?.data?.response?.newRegistration,
        title:"New Registration",
        color:"success",
        icon:"up",
        percentage:"+27.02%",
        detail:"than last 4 Month",
        image:"teacher.png",
        class:"student-2"
      },
      {
        student: dashData?.data?.response?.newSubscription,
        title:"New Subscription",
        color:"success",
        icon:"up",
        percentage:"+27.02%",
        detail:"than last 4 Month",
        image:"teacher.png",
        class:"student-2"
      },
      {
        student: dashData?.data?.response?.expiredSubscription,
        title:"Expire Subscription",
        color:"success",
        icon:"up",
        percentage:"+27.02%",
        detail:"than last 4 Month",
        image:"teacher.png",
        class:"student-2"
      }
    ]
  )
  }, [dashData]);
  return (
    <>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
          {topCards.map((data: any, i: number) => (
            <Col xl="4" sm="6" key={i}>
              <Card>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-end">
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
                    <div className="flex-shrink-0">
                      <Image
                        src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                        alt="student"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default MasterDashboard;
