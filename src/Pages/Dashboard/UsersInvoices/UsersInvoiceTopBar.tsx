import { Card, CardBody, Col, Row } from "reactstrap";
import { Btn, H2, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { totalStudentData } from "../../../Data/Dashboard/EducationData";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";

const UsersInvoiceTopBar = () => {
  const maAllUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.usersInvoice);
  console.log("maAllUsersData", maAllUsersData);
  const [topCards, setTopCards]: any = useState([]);
  useEffect(() => {
    setTopCards(
      [
        {
          student: maAllUsersData?.data?.summary?.total_invoices,
          color:"#6495ED",
          status: "Invoice Gen.",
          icon:"up",
          percentage: maAllUsersData?.data?.summary?.total_invoices,
          detail:"this week",
          image:"teacher.png",
          class:"student-2"
        },
        {
          student: maAllUsersData?.data?.summary?.paid_invoices,
          color:"#88D66C",
          status: "Paid Invoice",
          icon:"down",
          percentage: maAllUsersData?.data?.summary?.paid_amount,
          detail:"this week",
          image:"teacher.png",
          class:"student-2"
        },
        {
          student: maAllUsersData?.data?.summary?.free_invoices,
          color:"#FCDE70",
          status: "Free Invoice",
          icon:"up",
          percentage: maAllUsersData?.data?.summary?.free_amount,
          detail:"this week",
          image:"teacher.png",
          class:"student-2"
        },
        {
          student: maAllUsersData?.data?.summary?.cancel_invoices,
          color:"#C96868",
          status: "Cancel Invoice",
          icon:"up",
          percentage: maAllUsersData?.data?.summary?.cancel_amount,
          detail:"this week",
          image:"teacher.png",
          class:"student-2"
        },
      ]
    )
  }, [maAllUsersData]);
  return (
    <>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
          {topCards.map((data: any, i: number) => (
            <Col xl="3" sm="6" key={i}>
              <Card>
                <CardBody>
                  <div className="d-flex py-2 gap-2 align-items-center" style={{justifyContent: 'space-between'}}>
                    <div className="">
                        <div className="status-box">
                            <Btn style={{background: data.color}} color="">
                                {data.status}
                            </Btn>
                        </div>
                    </div>
                    <div className="">
                        <div className="d-flex student-arrow text-truncate">
                            <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                            <i className={`icon-arrow-${data.icon} font-${data.color}`} />
                            </P>&nbsp;&nbsp;&nbsp;
                            <span className={`f-w-500 font-${data.color}`}>₹ {data.percentage}&nbsp;&nbsp;</span>
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

export default UsersInvoiceTopBar;
