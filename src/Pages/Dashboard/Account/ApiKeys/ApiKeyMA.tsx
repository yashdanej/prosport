import React, { useEffect, useMemo, useState } from 'react'
import { getMasterAdminUsersTableData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { Link } from 'react-router-dom';
import { Btn } from '../../../../AbstractElements';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';


export interface ProductListTableDataColumnType {
    name: string;
    lastname: string;
    company_name: string;
    id: boolean;
    status: string;
    created_at: string;
}


const ApiKeyMA = () => {
    const [filters, setFilters] = useState({
        name: "",
        lastname: "",
        company_name: "",
        status: ""
      });
      const [filterText, setFilterText] = useState("");
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

      const filteredItems = maApiLogsData?.data?.records?.filter((item: ProductListTableDataColumnType) => {
        console.log("filters", filters);
        console.log("item", item);
        
        const matchesApiName = filters?.name ? item?.name?.includes(filters.name) : true;
        const matchesApiLastName = filters?.lastname ? item?.lastname?.includes(filters.lastname) : true;
        const matchesApiCompanyName = filters?.company_name ? item?.company_name?.includes(filters.company_name) : true;
        const matchesStatus = filters?.status ? (filters.status !== 'Active' ? !item.status : item.status) : true;
    
        return matchesApiName && matchesApiLastName && matchesApiCompanyName && matchesStatus;
      });
    
      const subHeaderComponentMemo = useMemo(() => {
        return (
          <div className="dataTables_filter d-flex align-items-center">
            <Label className="me-2">Search:</Label>
            <Input
              placeholder='Search by API URL' 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} 
              type="search" 
              value={filterText}
            />
          </div>
        );
      }, [filterText]);
    
      useEffect(() => {
        fetchAccountUsersTable();
      }, [dispatch]);
  return (
    <>
        <Col xl="12" md="12" className="proorder-md-1">
        <Container fluid>
        {
            maApiLogsData?.data &&
        <Row>
            <Col sm="12">
            <Card>
                <CommonCardHeader title="API Keys" />
                <CardBody>
                <div className="list-product">
                    <div className="table-responsive">
                    <DataTable
                        data={filteredItems} 
                        columns={productListTableDataColumn}
                        striped 
                        highlightOnHover 
                        pagination 
                        selectableRows 
                        subHeader 
                        subHeaderComponent={subHeaderComponentMemo} 
                    />
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
        </Row>
        }
        </Container>
      </Col>
    </>
  )
}

export default ApiKeyMA
