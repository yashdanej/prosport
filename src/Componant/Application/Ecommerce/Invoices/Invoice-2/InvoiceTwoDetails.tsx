import { Table } from "reactstrap";
import { Date, InvoiceNo, PaymentStatus, TotalAmount } from "../../../../../utils/Constant";
import { H4 } from "../../../../../AbstractElements";

const InvoiceTwoDetails = ({data}: any) => {
  return (
    <td>
      <Table className="table-responsive" style={{ width: "100%" }} borderless>
        <tbody>
          <tr style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed rgba(82, 82, 108, 0.3)", borderBottom: "1px dashed rgba(82, 82, 108, 0.3)", padding: "20px 0" }}>
            <td style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 136 }}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }} >
                {InvoiceNo}
              </span>
              <H4 style={{ margin: 0, fontWeight: 400, fontSize: 12 }}>
                {data?.invoice}
              </H4>
            </td>
            <td style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 136}}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }} >
                {Date} :
              </span>
              <H4 style={{ margin: 0, fontWeight: 400, fontSize: 12 }}>
                {data?.bill_date}
              </H4>
            </td>
            <td style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 146 }} >
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }}>
                {PaymentStatus} :
              </span>
              <H4 style={{ margin: 0, fontWeight: 400, fontSize: 12, padding: "6px 18px", backgroundColor: `${data?.status === "Paid"?'rgba(84, 186, 74, 0.1)':'#DC4C64'}`, color: `${data?.status === "Paid"?'#0DA759':'#ffffff'}`, borderRadius: 5 }} >
                {data?.status}
              </H4>
            </td>
            <td style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap"}}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500, minWidth: 136 }} >
                {TotalAmount} :
              </span>
              <H4 style={{ margin: 0, fontWeight: 400, fontSize: 12 }}>
                {data?.amount}
              </H4>
            </td>
          </tr>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceTwoDetails;
