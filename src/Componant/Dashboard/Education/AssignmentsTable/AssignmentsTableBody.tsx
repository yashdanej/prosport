import { Input, Label } from "reactstrap";
import { H6, Image, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { assignmentData } from "../../../../Data/Dashboard/EducationData";
import { Link } from "react-router-dom";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogEvents } from "../../../../ReduxToolkit/Reducers/Change/AuthSlice";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";

const AssignmentsTableBody = () => {
  const logEventsData = useSelector((state: RootState) => state.auth.logs);
  const dispatch = useDispatch<AppDispatch>();
  const getLogEventsHandle = () => {
    dispatch(getLogEvents());
  }
  useEffect(() => {
    getLogEventsHandle();
  }, []);
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${strMinutes} ${ampm}`;
  };
  return (
    <tbody>
      {logEventsData?.data?.map((item: any, i: number) => (
        <tr key={i}>
          <td>
            {i+1}
          </td>
          <td>
            <span>{item?.email}</span>
          </td>
          <td>
            <H6>{item?.created_at.split("T")[0]}</H6>
          </td>
          {/* <td>{data.subjects}</td>
          <td>{data.startDate}</td>
          <td>{data.endDate} </td> */}
          <td>
            {formatTime(item?.created_at)}
          </td>
          <td>
            {item?.ip_address}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AssignmentsTableBody;
