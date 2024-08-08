import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceTwoHeader from "./InvoiceTwoHeader";
import InvoiceTwoDetails from "./InvoiceTwoDetails";
import InvoiceTwoBilling from "./InvoiceTwoBilling";
import InvoiceTwoContent from "./InvoiceTwoContent";
import InvoiceTwoTotal from "./InvoiceTwoTotal";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceTwoContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef}>
        <Container className="invoice-2">
          <Card>
            <CardBody>
              <Table className="table-wrapper table-responsive theme-scrollbar" borderless>
                <tbody>
                  <tr>
                    <InvoiceTwoHeader />
                  </tr>
                  <tr>
                    <InvoiceTwoDetails />
                  </tr>
                  <tr>
                    <InvoiceTwoBilling />
                  </tr>
                  <tr>
                    <InvoiceTwoContent />
                  </tr>
                  <tr>
                    <InvoiceTwoTotal />
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default InvoiceTwoContainer;
