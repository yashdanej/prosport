import { Table } from "reactstrap";
import { ShippingRate, Subtotal, TotalAmount, Vat } from "../../../../../utils/Constant";

const InvoiceTwoTotal = ({data}: any) => {
  return (
    <td>
      <Table className="table-responsive" borderless>
        <tfoot>
          <tr>
            <td style={{ padding: "5px 24px 5px 0", paddingTop: 15 }}>
              <span style={{ fontSize: 12, fontWeight: 400 }}>{Subtotal} :</span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 15 }}>
              <span>₹{data?.amount}</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "5px 24px 5px 0" }}>
              <span style={{ fontSize: 12, fontWeight: 400 }}>{"GST"} (18%) :</span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 0}} >
              <span>₹{data?.amount * (18 / 100)}</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "12px 24px 5px 0", minWidth: 200 }}>
              <span style={{ fontWeight: 600, fontSize: 20, color: "#7A70BA" }}>
                {TotalAmount} :
              </span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 0}} >
              <span style={{color: 'rgba(122, 112, 186, 1)', fontSize: '24px'}}>₹{data?.amount + data?.amount * (18 / 100)}</span>
            </td>
          </tr>
        </tfoot>
      </Table>
    </td>
  );
};

export default InvoiceTwoTotal;
