import { invoiceHeaderData } from "../../../../../Data/Application/Ecommerce/Invoice";

const TableHeader = () => {
  return (
    <>
        {invoiceHeaderData.map((data,i)=>(
            <th style={{ padding: "14px 11px", textAlign: "left" }} key={i}>
                <span style={{ color: "#fff", fontSize: 12 }}>{data}</span>
            </th>
        ))}
    </>
  );
};

export default TableHeader;
