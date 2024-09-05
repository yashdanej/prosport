import React, { useEffect, useMemo, useState } from 'react'
import { getMasterAdminApiKeyData, getMasterAdminUsersTableData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { Link, useLocation } from 'react-router-dom';
import { Btn, P } from '../../../../AbstractElements';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';


export interface ProductListTableDataColumnType {
    userid: number;
    company_domain: string;
    secret_key: string;
    subscriptionid: string;
    token: string;
    status: boolean;
    start_date: string;
    expire_date: string;
}


const ApiKeyMA = () => {
    const [filters, setFilters] = useState({
        name: "",
        lastname: "",
        company_name: "",
        status: ""
      });
      const [filterText, setFilterText] = useState("");
      const maApiKeyData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.accountUsers.api_key);

      const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
        {
          name: "DOMAIN",
          selector: (row) => `${row?.company_domain || "No domain"}`,
          sortable: true,
        },
        {
          name: "ACCESS KEY",
          selector: (row) => row?.token || "Not Found",
          sortable: true,
        },
        {
          name: "SECRET KEY",
          selector: (row) => row?.secret_key,
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
          name: "SUBSCRIBED DATE",
          selector: (row) =>
            new Date(row?.start_date).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Asia/Kolkata',
            }),
          sortable: true,
        },
        {
          name: "EXPIRE DATE",
          selector: (row) =>
            new Date(row?.expire_date).toLocaleDateString('en-IN', {
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
            <>
              <span className='badge bg-primary'>Action</span>
            </>
          ),
        },
      ];

      const location = useLocation();
      const id = location.pathname.split("/")[3];

      const dispatch = useDispatch<AppDispatch>();
      const fetchApiKeyTable = async () => {
        try {
          console.log("fetchApiKeyTable in");
          
          await dispatch(getMasterAdminApiKeyData(+id)).unwrap();
        } catch (error) {
          console.log("error from fetchApiKeyTable", error);
        }
      }

      // const filteredItems = maApiKeyData?.data?.records?.filter((item: ProductListTableDataColumnType) => {
      //   console.log("filters", filters);
      //   console.log("item", item);
        
      //   const matchesApiName = filters?.name ? item?.name?.includes(filters.name) : true;
      //   const matchesApiLastName = filters?.lastname ? item?.lastname?.includes(filters.lastname) : true;
      //   const matchesApiCompanyName = filters?.company_name ? item?.company_name?.includes(filters.company_name) : true;
      //   const matchesStatus = filters?.status ? (filters.status !== 'Active' ? !item.status : item.status) : true;
    
      //   return matchesApiName && matchesApiLastName && matchesApiCompanyName && matchesStatus;
      // });
    
      // const subHeaderComponentMemo = useMemo(() => {
      //   return (
      //     <div className="dataTables_filter d-flex align-items-center">
      //       <Label className="me-2">Search:</Label>
      //       <Input
      //         placeholder='Search by API URL' 
      //         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} 
      //         type="search" 
      //         value={filterText}
      //       />
      //     </div>
      //   );
      // }, [filterText]);
    
      useEffect(() => {
        fetchApiKeyTable();
      }, [dispatch]);
  return (
    <>
        <Col xl="12" md="12" className="proorder-md-1">
        <Container fluid>
        {
            maApiKeyData?.data &&
        <Row>
            <Col sm="12">
            <Card>
                <CommonCardHeader title="API Keys" />
                <CardBody>
                <div className="list-product">
                    <div className="table-responsive">
                    <DataTable
                        data={maApiKeyData?.data} 
                        columns={productListTableDataColumn}
                        striped 
                        highlightOnHover 
                        pagination 
                        selectableRows 
                        subHeader 
                        // subHeaderComponent={subHeaderComponentMemo} 
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
