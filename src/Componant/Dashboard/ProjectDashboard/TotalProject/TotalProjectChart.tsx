import ReactApexChart from "react-apexcharts";
import { LI, P, UL } from "../../../../AbstractElements";
import { totalProjectData } from "../../../../Data/Dashboard/ProjectData";
import { totalProjectChart } from "../../../../Data/Dashboard/DefaultChartData";

const TotalProjectChart = () => {
  return (
    <>
      <ReactApexChart id="total-project" options={totalProjectChart} series={totalProjectChart.series} type='bar' height= {220} />
      <UL className="simple-list flex-row">
        {totalProjectData.map((data, i) => (
          <LI className="d-flex align-items-center gap-2" key={i}> 
            <span className={`bg-${data.color}`} />
            <P>{data.title}</P>
          </LI>
        ))}
      </UL>
    </>
  );
};

export default TotalProjectChart;
