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

const ContainerProject = () => {
  return (
    <Container fluid className="dashboard-2">
      <Row>
        <ProjectStatus />
        <RecentProjects />
        <TotalProject />
        <ProjectsOverview />
        <ClientActivity />
        <WebsiteDesign />
        <TodayTasks />
        <RunningEvents />
        <OnlineCourseTimeline />
      </Row>
    </Container>
  );
};

export default ContainerProject;
