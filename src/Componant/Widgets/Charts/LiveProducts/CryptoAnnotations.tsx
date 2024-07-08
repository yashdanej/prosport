import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { H4 } from '../../../../AbstractElements'
import ReactApexChart from 'react-apexcharts'
import { cryptoAnnotationChart } from '../../../../Data/Widgets/WidgetsChartData'
import { CryptoAnnotation } from '../../../../utils/Constant'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../ReduxToolkit/Store'
import { convertToIST } from '../../../../Utils'

const CryptoAnnotations = () => {
  const apiLogsData = useSelector((state: RootState) => state.dashboard.logs);
  const cryptoAnnotationChart: any = {
    series: [
        {
            data: apiLogsData?.data?.map((item: any) => item.call_count)
        }
    ],
    chart: {
        height: 400,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    annotations: {
        yaxis: [
            {
                y: 8200,
                y2: 8400,
                borderColor: "#f8d62b",
                fillColor: "#f8d62b",
                opacity: 0.1,
                label: {
                    borderColor: "#f8d62b",
                    offsetX: -30,
                    style: {
                        fontSize: "10px",
                        color: "#fff",
                        background: "#f8d62b",
                    },
                    text: "Y-axis range",
                },
            },
        ],
        xaxis: apiLogsData?.data?.map((item: any) => ({
            x: convertToIST(item.date),
            strokeDashArray: 0,
            borderColor: "var(--theme-deafult)",
            label: {
                borderColor: "var(--theme-deafult)",
                offsetY: 20,
                style: {
                    color: "#fff",
                    background: "var(--theme-deafult)",
                },
                text: "Anno Test",
            },
        })),
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: "smooth",
    },
    grid: {
        padding: {
            right: 30,
            left: 20,
        },
    },
    title: {
        text: "Line with Annotations",
        align: "left",
        style: {
            fontSize: "18px",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 500,
        },
    },
    // colors: [secondary], // Uncomment and replace `secondary` with your color variable if needed
    labels: apiLogsData?.data?.map((item: any) => item.date),
    xaxis: {
        type: "datetime",
    },
    responsive: [{
        breakpoint: 576,
        options: {
            title: {
                style: {
                    fontSize: "16px",
                },
            },
        },
    }]
};
  return (
    <Col xl="6" lg="12" className="xl-50">
      <Card>
        <CardHeader>
          <H4>Chart View</H4>
        </CardHeader>
        <CardBody>
          <div className="chart-container">
            <Row>
              <Col xs="12">
                <ReactApexChart
                  id="crypto-annotation"
                  options={cryptoAnnotationChart}
                  series={cryptoAnnotationChart.series}
                  type="line"
                  height={400}
                />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CryptoAnnotations