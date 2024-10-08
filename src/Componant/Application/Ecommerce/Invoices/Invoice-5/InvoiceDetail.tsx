import { H4 } from "../../../../../AbstractElements";
import { BankTransfer, BankAccount, Code, InvoiceHeading } from "../../../../../utils/Constant";

const InvoiceDetail = () => {
  return (
    <td>
      <H4 style={{ fontSize: 42, fontWeight: 600, color: "#7A70BA", margin: "0 0 12px 0" }} >
        {InvoiceHeading}
      </H4>
      <span style={{ fontSize: 16, color: "#7A70BA", display: "block", fontWeight: 600, marginBottom: 20 }} >
        {BankTransfer}
      </span>
      <span style={{ color: "#7A70BA", display: "block", marginBottom: 12, fontWeight: 600 }} >
        Leslie Alexander
      </span>
      <span style={{ display: "block", fontSize: 16, marginBottom: 12 }}>
        {BankAccount} : 0981234098765
      </span>
      <span style={{ display: "block", fontSize: 16, marginBottom: 12 }} >
        {Code} : LEF098756
      </span>
    </td>
  );
};

export default InvoiceDetail;
