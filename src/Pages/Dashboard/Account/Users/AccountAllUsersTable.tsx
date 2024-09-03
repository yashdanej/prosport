import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, P } from '../../../../AbstractElements';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getMasterAdminUsersTableData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { Link } from 'react-router-dom';

export interface ProductListTableDataColumnType {
    name: string;
    lastname: string;
    company_name: string;
    id: boolean;
    status: string;
    created_at: string;
}

const AccountAllUsersTable = () => {
  console.log("fetchAccountUsersTable infetchAccountUsersTable in");
  
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers);
  const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
    {
      name: "Name",
      selector: (row) => `${row?.name} ${row?.lastname?row?.lastname:""}`,
      sortable: true,
      grow: 2,
    },
    {
      name: "Company",
      selector: (row) => row?.company_name || "Not Found",
      sortable: true,
    },
    {
      name: "Id",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="status-box">
            <Btn className={`background-light-${!row.status ? 'danger' : 'success'} font-${!row.status ? 'danger' : 'success'} f-w-500`} color="">
                {!row.status ? 'De-Active' : 'Active'}
            </Btn>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Registered",
      selector: (row) => row?.created_at,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/masteradmin/account-user-view/${row?.id}`}>
            <Btn className={`background-light-info font-info f-w-500`}>
                View
            </Btn>
          </Link>
        </>
      ),
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const fetchAccountUsersTable = async () => {
    try {
      console.log("fetchAccountUsersTable in");
      
      await dispatch(getMasterAdminUsersTableData()).unwrap();
    } catch (error) {
      console.log("error from fetchAccountUsersTable", error);
    }
  }

  useEffect(() => {
    fetchAccountUsersTable();
  }, [dispatch]);

  return (
    <Container fluid>
      {
        maApiLogsData?.data &&
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable 
                    data={maApiLogsData?.data} 
                    columns={productListTableDataColumn} 
                    striped 
                    highlightOnHover 
                    pagination 
                    selectableRows 
                    subHeader 
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      }
    </Container>
  );
}

export default AccountAllUsersTable;
