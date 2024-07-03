import { Doughnut } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChatJSLineChart } from '../../../../utils/Constant'
import { doughnutChartData, doughnutChartDataOption } from '../../../../Data/Charts/ChartJs/ChartJs'

const DoughnutChart = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChatJSLineChart} />
        <CardBody className="chart-block">
          <Doughnut id="myDoughnutGraph" data={doughnutChartData} options={doughnutChartDataOption} width={734} height={335} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default DoughnutChart