import { Input, Label } from "reactstrap";
import { H6, Image, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { assignmentData } from "../../../../Data/Dashboard/EducationData";
import { Link } from "react-router-dom";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";

const AssignmentsTableBody = () => {
  return (
    <tbody>
      {assignmentData.map((data, i) => (
        <tr key={i}>
          <td>
            <Image src={dynamicImage(`dashboard-4/user/${data.image}`)} alt="user"/>
          </td>
          <td>
            <span>United States</span>
          </td>
          <td>
            <H6>20.01.2021</H6>
          </td>
          {/* <td>{data.subjects}</td>
          <td>{data.startDate}</td>
          <td>{data.endDate} </td> */}
          <td>
            10:00 PM
          </td>
          <td className="text-center">
            192.1.1
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AssignmentsTableBody;
