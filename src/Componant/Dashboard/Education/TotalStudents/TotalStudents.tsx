import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { growthChart } from "../../../../Data/Dashboard/DefaultChartData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { useEffect } from "react";
import { getApiKeys } from "../../../../ReduxToolkit/Reducers/Change/Subscribe";
import ReactApexChart from "react-apexcharts";

const TotalStudents = ({ analytics }: any) => {
  const apiKeyData = useSelector((state: RootState) => state.subscribe.api_keys);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getApiKeys());
  }, [dispatch]);

  const plansData = useSelector((state: RootState) => state.subscribe.plans);

  const dashboardData = [
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId)?.api_calls,
      title: "Total Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    },
    {
      hits: apiKeyData?.data?.[0]?.api_hits,
      title: "Used Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    },
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId)?.api_calls - apiKeyData?.data?.[0]?.api_hits,
      title: "Remaining Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    },
  ];

  const anylyticsData = [
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId)?.api_calls,
      title: "Total Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    },
    {
      hits: plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId)?.api_calls - apiKeyData?.data?.[0]?.api_hits,
      title: "Pending Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    },
  ];

  const data = analytics ? anylyticsData : dashboardData;

  return (
    <>
      <Col xl={!analytics ? "8" : "12"} md="12" className="proorder-md-1">
        <Row>
          {data.map((data, i) => (
            <Col xl="4" sm="6" key={i}>
              <Card>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="flex-grow-1">
                      <H2>{data.hits}</H2>
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
                        !analytics ? (
                          <Image
                            src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                            alt="student"
                          />
                        ) : (
                          <ReactApexChart
                            id="growthchart"
                            options={growthChart}
                            series={growthChart.series}
                            height={150}
                            type="line"
                          />
                        )
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
