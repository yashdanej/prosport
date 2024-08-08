import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Projects } from "../../../../utils/Constant";
import ProjectsTableBody from "./ProjectsTableBody";

const ProjectsTable = () => {
  return (
    <Col xl="12" className="proorder-xl-5 box-col-7 proorder-md-5">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title="Billing"/>
        <CardBody className="pt-0 projects px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display dataTable no-footer" id="selling-product">
                <thead>
                  <tr>
                    <th> 
                      <div className="form-check">
                        <Input type="checkbox"  />
                        <Label className="form-check-label"></Label>
                      </div>
                    </th>
                    <th>{"Invoice No"}</th>
                    <th>{"Products"}</th>
                    <th>{"Bill Date"}</th>
                    <th>{"Due Date"}</th>
                    <th>{"Price"}</th>
                    <th>{'Tax'}</th>
                    <th>{'Amount'}</th>
                    <th>{'Action'}</th>
                  </tr>
                </thead>
                <ProjectsTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectsTable;
