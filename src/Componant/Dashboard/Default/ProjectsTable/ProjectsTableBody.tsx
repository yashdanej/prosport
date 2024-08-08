import { Input, Label, Tooltip } from "reactstrap";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import { projectsTableBodyData } from "../../../../Data/Dashboard/DefaultData";
import { H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { useEffect, useRef, useState } from "react";
import { getApiKeys, getBilling, getSubscribe } from "../../../../ReduxToolkit/Reducers/Change/Subscribe";
import InternetBilling from "../../../Application/Invoice/InternetBilling";
import html2pdf from "html2pdf.js"
import InvoiceTwo from "../../../../Pages/Application/Ecommerce/Invoices/Invoice-2/Invoice-2";
import InvoiceFive from "../../../../Pages/Application/Ecommerce/Invoices/Invoice-5/Invoice-5";

const ProjectsTableBody = () => {
  // const apiLogsData = useSelector((state: RootState) => state.dashboard.api_logs);
  const billingData = useSelector((state: RootState) => state.subscribe.billing);
  const plansData = useSelector((state: RootState) => state.subscribe.plans);
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
  const invoiceContainerRef = useRef(null);

  const toggleTooltip = (id: any) => {
    setTooltipOpen((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const dispatch = useDispatch<AppDispatch>();
  const fetchBillingData = () => {
    dispatch(getBilling());
    dispatch(getSubscribe());
  }
  const data = billingData?.data?.map((item: any, i: number) => {
    const billDate = new Date(item?.created_at);
    const plan = plansData?.data?.find((plan: any) => plan.id === item.plan_id);
    const validityDays = plan ? parseInt(plan.validity, 10) : 0;
    // Calculate due date
    const dueDate = addDays(billDate, validityDays);

    return {
      invoice:`PSA-001-${item?.created_at?.split("T")[0]}`,
      product:"Cricket",
      color:"danger",
      bill_date:item?.created_at?.split("T")[0],
      due_date:dueDate.toISOString().split("T")[0],
      price:item?.amount,
      tax:"No Tax",
      amount:item?.amount 
    }
  });
  useEffect(() => {
    fetchBillingData();
  }, [dispatch]);

  const handleDownloadPdf = (invoiceData: any) => {
    const element = invoiceContainerRef.current;

    const opt = {
      margin: 0.02,
      filename: `${invoiceData.invoice}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' },
    };

    html2pdf().from(element).set(opt).save();
  };
  return (
    <>
    <div style={{ display: 'none' }}>
        <div ref={invoiceContainerRef}>
          <InvoiceTwo />
        </div>
      </div>
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
          <td className="icon-lists">
            <i onClick={() => handleDownloadPdf(data)} id={`icon-pdf-${i}`} style={{fontSize: '21px', cursor: 'pointer'}} className="fa fa-file-pdf-o"></i>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen[`icon-pdf-${i}`]}
              target={`icon-pdf-${i}`}
              toggle={() => toggleTooltip(`icon-pdf-${i}`)}
            >
              Download invoice
            </Tooltip>
          </td>
        </tr>
      ))}
    </tbody>
    </>
  );
};

export default ProjectsTableBody;
