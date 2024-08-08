import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { growthChart } from "../../../../Data/Dashboard/DefaultChartData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { useEffect } from "react";
import { getApiKeys } from "../../../../ReduxToolkit/Reducers/Change/Subscribe";
import ReactApexChart from "react-apexcharts";
import { getAnalyticsData } from "../../../../ReduxToolkit/Reducers/Change/AnalyticsSlice";

const TotalStudents = ({ analytics }: any) => {
  const apiKeyData = useSelector((state: RootState) => state.subscribe.api_keys);
  const analyticsData = useSelector((state: RootState) => state.analytics.analytics);
  const dispatch = useDispatch<AppDispatch>();
  console.log("apiKeyData", apiKeyData);
  
  useEffect(() => {
    dispatch(getApiKeys());
    dispatch(getAnalyticsData());
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

  const Hits = (from: string) => {
    const plan = plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId);
    console.log("plan", plan);
    if(!plan){
      return "Not subscribe";
    }else if(apiKeyData?.data?.[0]?.api_hits == plan.api_call.split(" ")[0]){
      return "API call limit reached"
    }else {
      if(from==="total"){
        return plan?.api_call.split(" ")[0];
      }else if(from === "pending"){
        return plan.api_call.split(" ")[0] - apiKeyData?.data?.[0]?.api_hits;
      }else{
        return apiKeyData?.data?.[0]?.api_hits || 0;
      }
    }
  }

  const anylyticsData = [
    {
      hits: Hits('total'),
      title: "Total Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "This month details",
      image: "student.png",
      class: "student",
    },
    {
      hits: Hits('pending'),
      title: "Pending Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "This month details",
      image: "student.png",
      class: "student",
    },
    {
      hits: Hits('used'),
      title: "Used Hits",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "This month details",
      image: "student.png",
      class: "student",
    },
  ];

  const data = !analytics ? anylyticsData : analyticsData?.data?.map((item: any) => {
    return {
      hits: item?.count,
      title: item?.normalized_endpoint?item?.normalized_endpoint:"/",
      color: "danger",
      icon: "down",
      percentage: "- 17.06%",
      detail: "than last 6 Month",
      image: "student.png",
      class: "student",
    }
  });

  return (
    <>
      <Col xl={!analytics ? "8" : "12"} md="12" className="proorder-md-1">
        <Row>
          {
          data?.length>0 ?
          data?.map((data: any, i: number) => (
            <Col xl="3" sm="6" key={i}>
              <Card>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="flex-grow-1">
                      <H2>{data.hits}</H2>
                      <P className="mb-0 text-truncate"> Matches API</P>
                      {/* <div className="d-flex student-arrow text-truncate">
                        <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                          <i className={`icon-arrow-${data.icon} font-${data.color}`} />
                        </P>
                        <span className={`f-w-500 font-${data.color}`}>{data.percentage}</span>
                        {data.detail}
                      </div> */}
                    </div>
                    <div className="flex-grow-2">
                      {
                        !analytics ? (
                          <Image
                            src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                            alt="student"
                          />
                        ) : (
                          <div style={{background: 'rgb(255 73 73)', borderRadius: '50%', padding: '20px'}}>
                            <Image src={dynamicImage(`dashboard-4/icon/${data.image}`)} alt="student" />
                          </div>
                        )
                      }
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
        : <p>No API call yet</p>
        }
        </Row>
      </Col>
    </>
  );
};

export default TotalStudents;
