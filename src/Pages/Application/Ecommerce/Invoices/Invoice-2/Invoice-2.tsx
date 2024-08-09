import React from "react";
import InvoiceTwoContainer from "../../../../../Componant/Application/Ecommerce/Invoices/Invoice-2/Invoice-2"

const InvoiceTwo = ({ data }: any) => {
  return (
    <div className='page-body'>
      <InvoiceTwoContainer data={data} />
    </div>
  );
};

export default InvoiceTwo;