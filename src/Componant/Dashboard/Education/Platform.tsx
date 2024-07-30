import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { MonthlyAttendances } from "../../../utils/Constant";
import { LI, Progressbar, UL } from "../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { monthlyChartData } from "../../../Data/Dashboard/DefaultChartData";

const Platform = () => {
  return (
    <Col xxl="7" xl="12" className="box-col-12 proorder-md-8">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title="Platform" firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="py-5">
          {/* <ReactApexChart id="monthly-reportchart" type="line" height={315} options={monthlyChartData} series={monthlyChartData.series} /> */}
          {/* <Progressbar animated={item.progress !== 100 ? true : false} color={item.progress === 100 ? 'success' : 'primary'} value={item.progress} style={{ height: '5px' }} /> */}
          <div className="d-flex justify-content-between">
            <div>
                Website
            </div>
            <div>
                80%
            </div>
          </div>
          <Progressbar animated={true} color='success' value={80} style={{ height: '5px' }} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default Platform;
