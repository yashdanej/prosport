import { Input, Label } from "reactstrap";
import { Btn, H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { recentOrdersData } from "../../../../Data/Dashboard/Ecommerce";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";

interface Props {
  apiLogsData: {
    data: {
      id: number;
      endpoint: string;
      count: number;
      // Add more properties as per your actual data structure
    }[];
    // Add more properties as per your actual data structure
  };
}

const RecentOrdersBody = ({ apiLogsData }: Props) => {
  return (
    <tbody>
      {apiLogsData?.data?.map((data, i) => (
        <tr key={i}>
          {/* <td>
            <div className="form-check">
              <Input type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td> */}
          <td>{i+1}</td>
          <td>{data.endpoint}</td>
          <td>{data.count}</td>
          {/* Example of rendering additional data */}
          {/* <td className="customer-img">
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image src={dynamicImage(`dashboard-3/user/${data.image1}`)} alt="dashboard-3" />
              </div>
              <div className="flex-grow-1">
                <H6>{data.name}</H6>
              </div>
            </div>
          </td>
          <td>
            <p>${data.amount}</p>
          </td>
          <td>
            <div className="status-box">
              <Btn className={`background-light-${data.color} font-${data.color} f-w-500`} color="">
                {data.status}
              </Btn>
            </div>
          </td> */}
        </tr>
      ))}
    </tbody>
  );
};

export default RecentOrdersBody;
