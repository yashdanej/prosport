import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Assignments } from "../../../../utils/Constant";
import AssignmentsTableBody from "./AssignmentsTableBody";

const AssignmentsTable = () => {
  return (
    <Col xl="8" md="12" className="proorder-md-4">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title="Log Events" mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 assignments-table px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display dataTable no-footer" id="assignments-table" >
                <thead>
                  <tr>
                    <th>
                      {/* <div className="form-check">
                        <Input type="checkbox"/>
                        <Label className="form-check-label" />
                      </div> */}
                    </th>
                    <th>{"Company"}</th>
                    <th>{"Date"}</th>
                    <th>{"Time"}</th>
                    <th>{"IP"}</th>
                    {/* <th>{"End Date"}</th>
                    <th>{"Progress"}</th>
                    <th>{"Actions"}</th> */}
                  </tr>
                </thead>
                <AssignmentsTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AssignmentsTable;
