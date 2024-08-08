import { H4, Image, LI, UL } from "../../../../../AbstractElements";
import { invoiceTwoDatas } from "../../../../../Data/Application/Ecommerce/Invoice";
import { dynamicImage } from "../../../../../Service";

const InvoiceTwoData = () => {
  return (
  <>
    {invoiceTwoDatas.map((data,i)=>(
      <tr className="invoice-dark" style={{ backgroundColor: "rgba(123, 111, 183, 0.1)", boxShadow: "0px 1px 0px 0px rgba(82, 82, 108, 0.15)" }} key={i}>
        <td style={{ padding: "14px 11px", display: "flex", alignItems: "center", gap: 10 }} >
          <span style={{ width: 54, height: 51, backgroundColor: "#F5F6F9", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
            <Image src={dynamicImage(`product_list/product-categories/${data.image}.png`)} alt="laptop" style={{ height: 29 }} />
          </span>
          <UL className="simple-list" style={{ padding: 0, margin: 0, listStyle: "none" }}>
            <LI>
              <H4 style={{ fontWeight: 400, margin: "4px 0px", fontSize: 12 }} >
                {data.title}
              </H4>
              <span style={{ opacity: "0.8", fontSize: 14 }}>{data.code}</span>
            </LI>
          </UL>
        </td>
        <td style={{ padding: "14px 11px" }}>
          <span>{data.quantity}</span>
        </td>
        <td style={{ padding: "14px 11px", width: "12%" }}>
          <span>${data.price}</span>
        </td>
        <td style={{ padding: "14px 11px", width: "12%" }}>
          <span>{data.unit}</span>
        </td>
        <td style={{ padding: "14px 11px", width: "10%" }}>
          <span>{data.vat}</span>
        </td>
        <td style={{ padding: "14px 11px" }}>
          <span>${data.total}</span>
        </td>
      </tr>
    ))}
  </>
  );
};

export default InvoiceTwoData;
