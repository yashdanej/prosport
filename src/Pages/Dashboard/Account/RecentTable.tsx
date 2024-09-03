import { Input, Label, Tooltip, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../ReduxToolkit/Store";
import { H6 } from "../../../AbstractElements";

const RecentTable = () => {
    const maRecentDeviceData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.recentDevice);
    const data: any = maRecentDeviceData?.data;
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const toggleTooltip = (id: any) => {
        setTooltipOpen((prevState: any) => ({
        ...prevState,
        [id]: !prevState[id]
        }));
    };

  return (
    <>
      <tbody>
        {data?.map((data: any, i: number) => (
          <tr key={i}>
            <td></td>
            <td>{data.browser}</td>
            <td>{data.device}, ({data.os})</td>
            <td>{data.city}, {data.state}, {data.country}</td>
            <td>{data.created_at.split('T')[0]}</td>
            <td>{data.ip}</td>
            <td>Action</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default RecentTable;
