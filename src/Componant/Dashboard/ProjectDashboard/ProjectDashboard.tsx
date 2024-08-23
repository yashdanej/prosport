import { Container, Row } from "reactstrap";
import ProjectStatus from "./ProjectStatus/ProjectStatus";
import RecentProjects from "./RecentProjects/RecentProjects";
import TotalProject from "./TotalProject/TotalProject";
import ProjectsOverview from "./ProjectsOverview/ProjectsOverview";
import ClientActivity from "./ClientActivity/ClientActivity";
import WebsiteDesign from "./WebsiteDesign/WebsiteDesign";
import TodayTasks from "./TodayTasks/TodayTasks";
import RunningEvents from "./RunningEvents/RunningEvents";
import OnlineCourseTimeline from "./OnlineCourseTimeline/OnlineCourseTimeline";
import MasterDashboard from "../MasterAdmin/MasterDashboard";
import { useEffect, useState } from "react";
import { api } from "../../../Utils";
import { AppDispatch } from "../../../ReduxToolkit/Store";
import { useDispatch } from "react-redux";
import TotalSaleWidgets from "../../Widgets/Charts/TotalSaleWidgets/TotalSaleWidgets";
import { getMasterDashboardData } from "../../../ReduxToolkit/Reducers/Change/MasterDashboard";
import ActiveMembers from "../Default/ActiveMembers/ActiveMembers";
import TopSports from "../MasterAdmin/TopSports";
import DeviceUsage from "../MasterAdmin/DeviceUsage";

const ContainerProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getLast7DaysRange = () => {
    const endDate = new Date().toISOString().split('T')[0]; // Today's date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // 7 days before today
    const startDateStr = startDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' format

    return { startDate: startDateStr, endDate };
  };

  const fetchMasterDashboardData = async (from: string, to: string) => {
    try {
      await dispatch(getMasterDashboardData({ from, to })).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardData", error);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = getLast7DaysRange();
    fetchMasterDashboardData(startDate, endDate);
  }, [dispatch]);
  return (
    <Container fluid className="dashboard-2">
      <Row>
        <MasterDashboard/>
        <TotalSaleWidgets />
        <ActiveMembers />
        <TopSports/>
        <DeviceUsage/>
        {/* <ProjectStatus />
        <RecentProjects />
        <TotalProject />
        <ProjectsOverview />
        <ClientActivity />
        <WebsiteDesign />
        <TodayTasks />
        <RunningEvents />
        <OnlineCourseTimeline /> */}
      </Row>
    </Container>
  );
};

export default ContainerProject;
