import { Card, CardBody, Col, Row } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";
import { ApexOptions } from 'apexcharts';
import MyDatePicker from "../../../Forms/FormsWidgets/DatePicker/DatesPicker/MyDatePicker";
import { getMasterDashboardData } from "../../../../ReduxToolkit/Reducers/Change/MasterDashboard";

const TotalSaleWidgets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);

  const [graphData, setGraphData] = useState({ dates: [], hits: [] });
  const [dateRange, setDateRange] = useState<{ from: string, to: string }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0], // Default to last 7 days
    to: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMasterDashboardData(dateRange.from, dateRange.to);
  }, [dateRange]);

  const fetchMasterDashboardData = async (from: string, to: string) => {
    console.log("");
    
    try {
      await dispatch(getMasterDashboardData({ from, to })).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardData", error);
    }
  }

  useEffect(() => {
    if (dashData?.data?.dayWiseApiHits) {
      const dates = dashData.data.dayWiseApiHits.map((data: any) => new Date(data.date).toISOString());
      const hits = dashData.data.dayWiseApiHits.map((data: any) => data.hits);

      setGraphData({ dates, hits });
    }
  }, [dashData]);

  const productChart: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      height: 300,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: graphData.dates, // Use dates from API data
      labels: {
        show: true, // Show labels on x-axis
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: true, // Show labels on y-axis
    },
    grid: {
      show: false,
      padding: {
        left: -10,
        top: -25,
        right: -60,
        bottom: -40,
      },
    },
    fill: {
      opacity: 0.2,
    },
    colors: ["#63d5be"],
    series: [
      {
        name: "API Hits",
        data: graphData.hits, // Use hits from API data
      },
    ],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 100,
          }
        }
      }
    ]
  };

  const handleDateChange = (from: string, to: string) => {
    setDateRange({ from, to });
  }

  return (
    <Col xxl="9" xl="9" md="12" className="box-col-4">
      <Card className="o-hidden">
        <div className="chart-widget-top">
          <CardBody className="pb-0 m-0">
            <Row>
              <Col xl="9" lg="8" xs="9" className="p-0">
                <H5 className="f-w-600 mb-2">{"API Hits Usage"}</H5>
              </Col>
              <Col xl="3" lg="4" xs="3" className="text-end p-0">
                <MyDatePicker onDateChange={handleDateChange} />
              </Col>
            </Row>
          </CardBody>
          <div>
              <ReactApexChart
                id='chart-widget1'
                options={productChart}
                series={productChart.series}
                type={productChart.chart?.type}
                height={300}
              />
            </div>
        </div>
      </Card>
    </Col>
  );
};

export default TotalSaleWidgets;
