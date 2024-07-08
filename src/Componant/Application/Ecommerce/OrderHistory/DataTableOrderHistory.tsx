import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, Col, Input, Label } from 'reactstrap';
import { OrdersHistory, SearchTableButton } from '../../../../utils/Constant';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import DataTable, { TableColumn } from 'react-data-table-component';
import { orderHistoryData } from '../../../../Data/Application/Ecommerce/OrderHistory';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getBilling, getSubscribe } from '../../../../ReduxToolkit/Reducers/Change/Subscribe';
import { OrderHistoryTableColumns } from '../../../../Types/Application/Ecommerce/OrderHistory';
import { convertToIST } from '../../../../Utils';


const DataTableOrderHistory = () => {
  // const apiLogsData = useSelector((state: RootState) => state.dashboard.api_logs);
  const billingData = useSelector((state: RootState) => state.subscribe.billing);
  const plansData = useSelector((state: RootState) => state.subscribe.plans);

  const orderHistoryDataColumn: TableColumn<OrderHistoryTableColumns>[] = [
    {
      name: "S.No",
      selector: (row, index: any) => `${index + 1}`,
      sortable: false,
      center: true,
    },
    {
      name: "Plan",
      selector: (row) => `${plansData?.data?.find((plan: any) => plan.id === row.plan_id)?.name}`,
      sortable: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => `${row.amount}`,
      sortable: true,
      center: true,
    },
    {
      name: "Subscribe Date",
      selector: (row) => `${convertToIST(row.subscribe_date).split(",")[0]}`,
      center: true,
    },
  ];

    const [filterText, setFilterText] = useState("");

    const filteredItems = billingData?.data?.filter((item:any) =>item.id);
    
    const subHeaderComponentMemo = useMemo(() => {
      return (
        <div id="basic-1_filter" className="dataTables_filter d-flex align-items-center">
          <Label className="me-2">{SearchTableButton}:</Label>
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
        </div>
      );
    }, [filterText]);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      // dispatch(getApiLogs());
      dispatch(getBilling());
    }, [dispatch]);
    console.log("billingData", billingData);

    const fetchPlans = () => {
      dispatch(getSubscribe());
    }
  
    useEffect(() => {
      fetchPlans();
    }, [dispatch]);
    return (
      <Col sm="12">
          <Card>
              <CommonCardHeader title="Billing" />
              <CardBody>
                  <div className="order-history table-responsive">
                      <DataTable
                          data={filteredItems}
                          columns={orderHistoryDataColumn}
                          className="dataTables_wrapper theme-scrollbar no-footer"
                          highlightOnHover
                          noHeader
                          pagination
                          paginationServer
                          subHeader
                          subHeaderComponent={subHeaderComponentMemo}
                      />
                  </div>
              </CardBody>
          </Card>
      </Col>
  );
}

export default DataTableOrderHistory