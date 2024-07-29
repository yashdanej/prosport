import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { totalStudentData, totalStudentData2 } from "../../../../Data/Dashboard/EducationData";
import ReactApexChart from "react-apexcharts";
import { growthChart } from "../../../../Data/Dashboard/DefaultChartData";

const TotalStudents = ({analytics}: any) => {
  const data = !analytics?totalStudentData:totalStudentData2
  return (
    <>
      <Col xl={!analytics?"8":"12"} md="12" className="proorder-md-1">
        <Row>
          {data.map((data, i) => (
            <Col xl="4" sm="6" key={i}>
              <Card>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="flex-grow-1">
                      <H2>{data.student}</H2>
                      <P className="mb-0 text-truncate"> {data.title}</P>
                      <div className="d-flex student-arrow text-truncate">
                        <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                          <i className={`icon-arrow-${data.icon} font-${data.color}`} />
                        </P>
                        <span className={`f-w-500 font-${data.color}`}>{data.percentage}</span>
                        {data.detail}
                      </div>
                    </div>
                    <div className="flex-grow-2">
                      {
                        !analytics?
                        <Image
                          src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                          alt="student"
                        />:
                        <ReactApexChart
                          id="growthchart"
                          options={growthChart}
                          series={growthChart.series}
                          height={150}
                          type="line"
                        />
                      }
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

export default TotalStudents;
