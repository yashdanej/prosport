import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../CommonElements/CommonCardHeader/CommonCardHeader";
import ProjectsTableBody from "../../../Componant/Dashboard/Default/ProjectsTable/ProjectsTableBody";
import RecentTable from "./RecentTable";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../ReduxToolkit/Store";
import { getMasterAdminRecentDeviceData } from "../../../ReduxToolkit/Reducers/Change/ApiLogsSlice";
import { useEffect } from "react";

const RecentDevice = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const dispatch = useDispatch<AppDispatch>();
  const fetchAccountUsersRecentDeviceData = async () => {
    try {
      console.log("fetchAccountUsersRecentDeviceData in");
      await dispatch(getMasterAdminRecentDeviceData(+id)).unwrap();
    } catch (error) {
      console.log("error from fetchAccountUsersRecentDeviceData", error);
    }
  }
  useEffect(() => {
    fetchAccountUsersRecentDeviceData();
  }, [dispatch]);
  return (
    <Col xl="12" className="proorder-xl-5 box-col-7 proorder-md-5">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title="Recent Devices"/>
        <CardBody className="pt-0 projects px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display dataTable no-footer" id="selling-product">
                <thead>
                  <tr>
                    <th></th>
                    <th>{"Browser"}</th>
                    <th>{"Device"}</th>
                    <th>{"Location"}</th>
                    <th>{"Recent Activity"}</th>
                    <th>{'IP Address'}</th>
                    <th>{'Action'}</th>
                  </tr>
                </thead>
                <RecentTable />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentDevice;
