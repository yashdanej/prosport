import { Card, CardBody, Col, Row } from "reactstrap";
import { Btn, H2, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { totalStudentData } from "../../../Data/Dashboard/EducationData";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";

const StatusTopBar = () => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.apiLog);
  console.log("maApiLogsData", maApiLogsData);
  const [topCards, setTopCards]: any = useState([]);
  useEffect(() => {
    setTopCards(
      [
      {
        student: maApiLogsData?.data?.successfulCount,
        color:"success",
        status: "Success",
        icon:"up",
        percentage: maApiLogsData?.data?.successPercentageChange,
        detail:"than last 1 Month",
        image:"teacher.png",
        class:"student-2"
      },
      {
        student: maApiLogsData?.data?.failedCount,
        color:"danger",
        status: "Failure",
        icon:"down",
        percentage: maApiLogsData?.data?.failedPercentageChange,
        detail:"than last 1 Month",
        image:"teacher.png",
        class:"student-2"
      }
    ]
  )
  }, [maApiLogsData]);
  return (
    <>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
          {topCards.map((data: any, i: number) => (
            <Col xl="6" sm="6" key={i}>
              <Card>
                <CardBody>
                  <div className="d-flex py-2 gap-2 align-items-center" style={{justifyContent: 'space-between'}}>
                    <div className="">
                        <div className="status-box">
                            <Btn className={`background-light-${data.color} font-${data.color} f-w-500`} color="">
                                {data.status}
                            </Btn>
                        </div>
                    </div>
                    <div className="">
                        <div className="d-flex student-arrow text-truncate">
                            <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                            <i className={`icon-arrow-${data.icon} font-${data.color}`} />
                            </P>&nbsp;&nbsp;&nbsp;
                            <span className={`f-w-500 font-${data.color}`}>{data.percentage}% &nbsp;&nbsp;</span>
                            {data.detail}
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <H2>{data.student}</H2>
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

export default StatusTopBar;
