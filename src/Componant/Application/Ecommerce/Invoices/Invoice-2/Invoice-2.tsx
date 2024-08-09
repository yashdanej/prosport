import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceTwoHeader from "./InvoiceTwoHeader";
import InvoiceTwoDetails from "./InvoiceTwoDetails";
import InvoiceTwoBilling from "./InvoiceTwoBilling";
import InvoiceTwoContent from "./InvoiceTwoContent";
import InvoiceTwoTotal from "./InvoiceTwoTotal";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../ReduxToolkit/Store";
import { getLoggedUserProfile } from "../../../../../ReduxToolkit/Reducers/Change/ProfileSlice";

const InvoiceTwoContainer = ({data}: any) => {
  console.log("ddata", data);
  
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = () => {
    dispatch(getLoggedUserProfile());
  }
  
  useEffect(() => {
    fetchUser();
  }, []);
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
                    <InvoiceTwoDetails data={data} />
                  </tr>
                  <tr>
                    <InvoiceTwoBilling />
                  </tr>
                  <tr>
                    <InvoiceTwoContent data={data} />
                  </tr>
                  <tr>
                    <InvoiceTwoTotal data={data} />
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
