import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RecentOrder } from "../../../../utils/Constant";
import RecentOrdersBody from "./RecentOrdersBody";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { getApiLogs } from "../../../../ReduxToolkit/Reducers/Change/Dashboard";
import { getApiKeys } from "../../../../ReduxToolkit/Reducers/Change/Subscribe";
import { useEffect } from "react";

const RecentOrders = () => {
  const apiLogsData = useSelector((state: RootState) => state.dashboard.api_logs);
 
  return (
    <Col xxl="7" xl="8" sm="12">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title="Api Hits" firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 recent-orders px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display dataTable no-footer" id="recent-orders">
                <thead>
                  <tr>
                    {/* <th>
                      <div className="form-check">
                        <Input type="checkbox" />
                        <Label className="form-check-label" />
                      </div>
                    </th> */}
                    <th>{"Serial"}</th>
                    <th>{"API"}</th>
                    <th>{"Hits"}</th>
                  </tr>
                </thead>
                <RecentOrdersBody apiLogsData={apiLogsData} />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentOrders;
