import React, { useEffect } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getApiLogs } from '../../../../ReduxToolkit/Reducers/Change/Dashboard';
import RecentOrdersBody from './RecentOrdersBody';
import ContentLoaderTotalSells from '../TotalSells/ContentLoaderTotalSells';
// import ContentLoaderTotalSells from './ContentLoaderTotalSells';  // Ensure the correct path to the loader component

const RecentOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apiLogsData = useSelector((state: RootState) => state.dashboard.api_logs);
  // const loading = useSelector((state: RootState) => state.dashboard.loading);

  useEffect(() => {
    dispatch(getApiLogs());
  }, [dispatch]);

  return (
    <Col xxl="7" xl="8" sm="12">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title="API Hits" firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 recent-orders px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              {apiLogsData.isLoading ? (
                // Render the loader while the data is being fetched
                Array(3).fill(0).map((_, index) => (
                  <ContentLoaderTotalSells key={index} />
                ))
              ) : (
                <Table className="table display dataTable no-footer" id="recent-orders">
                  <thead>
                    <tr>
                      <th>{"Serial"}</th>
                      <th>{"API"}</th>
                      <th>{"Hits"}</th>
                    </tr>
                  </thead>
                  <RecentOrdersBody apiLogsData={apiLogsData} />
                </Table>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentOrders;
