import { H4 } from "../../../../../AbstractElements";
import { invoiceFourData } from "../../../../../Data/Application/Ecommerce/Invoice";

const InvoiceTableBody = () => {
  return (
    <>
    {invoiceFourData.map((data,i)=>(
      <tr key={i}>
        <td style={{ padding: 30 }}>
          <H4 style={{ fontWeight: 600, margin: "4px 0px",fontSize: 16, color: "#7A70BA" }}>
            {data.title}
          </H4>
          <span style={{ opacity: "0.8", fontSize: 16 }}>{data.detail}</span>
        </td>
        <td style={{ width: "12%", textAlign: "center" }}>
          <span style={{ opacity: "0.8" }}>${data.price}.00</span>
        </td>
        <td style={{ width: "12%", textAlign: "center" }}>
          <span style={{ opacity: "0.8" }}>{data.quantity}</span>
        </td>
        <td style={{ width: "12%", textAlign: "center" }}>
          <span style={{ color: "#7A70BA", fontWeight: 600, opacity: "0.9" }} >
            ${data.total}.00
          </span>
        </td>
      </tr>
    ))}
    </>
  );
};

export default InvoiceTableBody;
