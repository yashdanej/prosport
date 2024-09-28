import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Card, CardBody, Col, Container, Row, Input, Label, Button,
  Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import { CSVLink } from 'react-csv';
import { AppDispatch, RootState } from '../../../ReduxToolkit/Store';
import { getMasterAdminUsersTableData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { Btn, P } from '../../../AbstractElements';

export interface UserDataType {
  id: number;
  name: string;
  lastname: string;
  company_name: string;
  status: boolean;
  created_at: string;
}

const EnhancedAccountManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers);
  const [activeTab, setActiveTab] = useState<any>('1');
  const [filterText, setFilterText] = useState<any>('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState<any>(false);

  useEffect(() => {
    dispatch(getMasterAdminUsersTableData());
  }, [dispatch]);

  const activeUsers = maApiLogsData?.data?.filter((user: any) => user.status) || [];
  const inactiveUsers = maApiLogsData?.data?.filter((user: any) => !user.status) || [];

  const filteredItems = maApiLogsData?.data?.filter(
    (item: any) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  ) || [];

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          className='mx-1'
          type="text"
          placeholder="Filter By Name"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <Button color="secondary" className='mx-1' onClick={handleClear}>Clear</Button>
        <CSVLink data={maApiLogsData?.data || []} filename={"user_data.csv"}>
          <Button color="primary" className="mx-1">Export</Button>
        </CSVLink>
      </div>
    );
  }, [filterText, resetPaginationToggle, maApiLogsData?.data]);

  const columns: TableColumn<UserDataType>[] = [
    {
      name: "Name",
      selector: (row) => `${row?.name} ${row?.lastname || ""}`,
      sortable: true,
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
      selector: (row) =>
        row?.created_at &&
        new Date(row?.created_at).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          timeZone: 'Asia/Kolkata',
        }),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/masteradmin/account-user-view/${row?.id}`}>
          <Btn className={`background-light-info font-info f-w-500`}>
            View
          </Btn>
        </Link>
      ),
    },
  ];

  return (
    <div className="page-body">
    <Container fluid>
      <Row>
        <Col sm="12" md="6">
          <Card>
            <CardBody>
              <h4>Active Users</h4>
              <P>{activeUsers.length}</P>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6">
          <Card>
            <CardBody>
              <h4>Inactive Users</h4>
              <P>{inactiveUsers.length}</P>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === '1' ? 'active' : ''}
                    onClick={() => setActiveTab('1')}
                  >
                    All Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === '2' ? 'active' : ''}
                    onClick={() => setActiveTab('2')}
                  >
                    Active Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === '3' ? 'active' : ''}
                    onClick={() => setActiveTab('3')}
                  >
                    Inactive Users
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    striped
                    highlightOnHover
                  />
                </TabPane>
                <TabPane tabId="2">
                  <DataTable
                    columns={columns}
                    data={activeUsers}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    striped
                    highlightOnHover
                  />
                </TabPane>
                <TabPane tabId="3">
                  <DataTable
                    columns={columns}
                    data={inactiveUsers}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    striped
                    highlightOnHover
                  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default EnhancedAccountManagement;