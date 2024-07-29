import { Input, Label } from "reactstrap";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { projectsTableBodyData } from "../../../../Data/Dashboard/DefaultData";
import { H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";

const ProjectsTableBody = () => {
  const data = [
    {
        invoice:"PSA-001-07-24",
        product:"Cricket",
        color:"danger",
        bill_date:"June 25, 2024",
        due_date:"June 25, 2024",
        price:"495,00",
        tax:"5,00",
        amount:"500,00"
    },
    {
      invoice:"PSA-001-07-24",
      product:"Cricket",
      color:"secondary",
      bill_date:"June 25, 2024",
      due_date:"June 25, 2024",
      price:"495,00",
      tax:"5,00",
      amount:"500,00"
    },
    {
      invoice:"PSA-001-07-24",
      product:"Cricket",
      color:"secondary",
      bill_date:"June 25, 2024",
      due_date:"June 25, 2024",
      price:"495,00",
      tax:"5,00",
      amount:"500,00"
    },
    {
      invoice:"PSA-001-07-24",
      product:"Cricket",
      color:"secondary",
      bill_date:"June 25, 2024",
      due_date:"June 25, 2024",
      price:"495,00",
      tax:"5,00",
      amount:"500,00"
    },
    {
      invoice:"PSA-001-07-24",
      product:"Cricket",
      color:"secondary",
      bill_date:"June 25, 2024",
      due_date:"June 25, 2024",
      price:"495,00",
      tax:"5,00",
      amount:"500,00"
    },
  ]
  return (
    <tbody>
      {data.map((data, i) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input className="form-check-input" type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td>
            <td> {data.invoice}</td>
          </td>
          <td className="project-dot">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <span className={`bg-${data.color}`} />
              </div>
              <div className="flex-grow-1">
                <H6>{data.product}</H6>
              </div>
            </div>
          </td>
          <td> {data.bill_date}</td>
          <td> {data.due_date}</td>
          <td>{data.price}</td>
          <td>{data.tax}</td>
          <td>{data.amount}</td>
          <td className="text-center">
            <CardHeaderDropDown
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProjectsTableBody;
