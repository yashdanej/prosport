import { Container, Row } from "reactstrap";
import TotalStudents from "./TotalStudents/TotalStudents";
import StudyStatistics from "./StudyStatistics/StudyStatistics";
import AssignmentsTable from "./AssignmentsTable/AssignmentsTable";
import LiveMeeting from "./LiveMeeting/LiveMeeting";
import ActivelyHours from "./ActivelyHours/ActivelyHours";
import EnrolledClasses from "./EnrolledClasses/EnrolledClasses";
import FeaturedCourses from "./FeaturedCourses/FeaturedCourses";
import MonthlyAttendance from "./MonthlyAttendance/MonthlyAttendance";
import Schedule from "./Schedule/Schedule";
import ShiftsOverview from "../Default/ShiftsOverview/ShiftsOverview";
import Platform from "./Platform";
import { H1 } from "../../../AbstractElements";

const ContainerEducation = ({analytics}: any) => {
  return (
    <Container fluid className="dashboard-4">
      <H1 className="fw-bold my-4">General Setting</H1>
      <Row>
        <TotalStudents analytics={analytics} />
        {/* <StudyStatistics /> */}
        {
          !analytics&&
          <>
            <ShiftsOverview />
            <AssignmentsTable />
            <LiveMeeting />
            {/* <ActivelyHours /> */}
            {/* <EnrolledClasses /> */}
            <FeaturedCourses />
            {/* <MonthlyAttendance /> */}
            <Platform/>
            {/* <Schedule /> */}
          </>
        }
      </Row>
    </Container>
  );
};

export default ContainerEducation;
