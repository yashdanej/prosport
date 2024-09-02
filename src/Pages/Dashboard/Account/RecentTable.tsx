import { Input, Label, Tooltip, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../ReduxToolkit/Store";
import { H6 } from "../../../AbstractElements";

const RecentTable = () => {
    const data: any = [];
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
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default RecentTable;
