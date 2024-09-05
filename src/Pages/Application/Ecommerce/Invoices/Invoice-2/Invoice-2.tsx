import React from "react";
import InvoiceTwoContainer from "../../../../../Componant/Application/Ecommerce/Invoices/Invoice-2/Invoice-2"

const InvoiceTwo = ({ data, from = 'operator' }: any) => {
  return (
    <div className='page-body'>
      <InvoiceTwoContainer data={data} from={from} />
    </div>
  );
};

export default InvoiceTwo;