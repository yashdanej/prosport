import { Table } from "reactstrap";
import { BillingAddress, Phone, ShippingAddress } from "../../../../../utils/Constant";
import { H4 } from "../../../../../AbstractElements";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../ReduxToolkit/Store";

const InvoiceTwoBilling = () => {
  const profileData = useSelector((state: RootState) => state.profile.profile);
  return (
    <td>
      <Table className="table-responsive" style={{ width: "100%" }} borderless>
        <tbody>
          <tr style={{ padding: "20px 0", display: "block" }}>
            <td style={{ width: "70%", minWidth: 304 }}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }}>
                {BillingAddress}
              </span>
              <H4 style={{ fontWeight: 400, margin: "6px 0 3px 0", fontSize: 12 }} >
                Brooklyn Simmons
              </H4>
              <span style={{ width: "54%", display: "block", lineHeight: "1.5", opacity: "0.8", fontSize: 12, fontWeight: 400 }} >
                2118 Thornridge Cir. Syracuse, Connecticut 35624, United State
              </span>
              <span style={{ lineHeight: "2.6", opacity: "0.8", fontSize: 12, fontWeight: 400 }} >
                {Phone} : (239) 555-0108
              </span>
            </td>
            <td style={{ minWidth: 280 }}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }} >
                {ShippingAddress}
              </span>
              <H4 style={{ fontWeight: 400, margin: "6px 0 3px 0", fontSize: 12,}} >
                {profileData?.data?.name} {profileData?.data?.lastname}
              </H4>
              <span style={{ width: "95%", display: "block", lineHeight: "1.5", opacity: "0.8", fontSize: 12, fontWeight: 400 }}>
                {profileData?.data?.address}
              </span>
              <span style={{ lineHeight: "2.6", opacity: "0.8", fontSize: 12, fontWeight: 400 }}>
                {Phone} : {profileData?.data?.phone}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceTwoBilling;
