import { Card, CardBody, Col, Row } from "reactstrap";
import { Btn, H2, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { totalStudentData } from "../../../Data/Dashboard/EducationData";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";

const AllUsersTopBar = () => {
  const maAllUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.allUsers);
  console.log("maAllUsersData", maAllUsersData);
  const [topCards, setTopCards]: any = useState([]);
  useEffect(() => {
    setTopCards(
      [
      {
        student: maAllUsersData?.data?.count?.active_count,
        color:"success",
        status: "Active",
        icon:"up",
        percentage: maAllUsersData?.data?.count?.active_percentage,
        detail:"this week",
        image:"teacher.png",
        class:"student-2"
      },
      {
        student: maAllUsersData?.data?.count?.inactive_count,
        color:"danger",
        status: "De-Active",
        icon:"down",
        percentage: maAllUsersData?.data?.count?.inactive_percentage,
        detail:"this week",
        image:"teacher.png",
        class:"student-2"
      }
    ]
  )
  }, [maAllUsersData]);
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

export default AllUsersTopBar;
