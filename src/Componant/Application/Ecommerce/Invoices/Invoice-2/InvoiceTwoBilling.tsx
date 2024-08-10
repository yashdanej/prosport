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
                {"Billing"}
              </span>
              <H4 style={{ fontWeight: 400, margin: "6px 0 3px 0", fontSize: 12 }} >
                From: support@prosportsapi.com
              </H4>
              <span style={{ width: "54%", display: "block", lineHeight: "1.5", opacity: "0.8", fontSize: 12, fontWeight: 400 }} >
                Name: Prosport
              </span>
              <span style={{ lineHeight: "2.6", opacity: "0.8", fontSize: 12, fontWeight: 400 }} >
                {Phone} : +91 773 888 9594
              </span>
            </td>
            <td style={{ minWidth: 280 }}>
              <span style={{ opacity: "0.8", fontSize: 12, fontWeight: 500 }} >
                {"Shipping"}
              </span>
              <H4 style={{ fontWeight: 400, margin: "6px 0 3px 0", fontSize: 12}} >
                To: {profileData?.data?.email}
              </H4>
               <span style={{ width: "95%", display: "block", lineHeight: "1.5", opacity: "0.8", fontSize: 12, fontWeight: 400 }}>
                Name: {profileData?.data?.name} {profileData?.data?.lastname}
              </span>
              <span style={{ width: "95%", display: "block", lineHeight: "1.5", opacity: "0.8", fontSize: 12, fontWeight: 400 }}>
                Address: {profileData?.data?.address}
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
