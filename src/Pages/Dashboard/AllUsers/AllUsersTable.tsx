import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Btn, P } from '../../../AbstractElements';
import { RootState } from '../../../ReduxToolkit/Store';
import AllUserProductListFilterHeader from './AllUsersProductListFilterHeader';
import AllUsersCollapseFilterData from './AllUsersCollapseFilterData';

export interface ProductListTableDataColumnType {
    id: string;
    token: string;
    status: boolean;
    start_date: string;
    expire_date: string;
}

const AllUsersTable = ({fetchMasterDashboardAllUsersData}: any) => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.allUsers);
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    token: "",
    status: ""
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
    {
      name: "Users ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "API KEY",
      selector: (row) => row?.token,
      sortable: true,
    },
    {
      name: "STATUS",
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
      name: "Create Date",
      selector: (row) => row?.start_date?.split('T')[0],
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: (row) => row?.expire_date?.split('T')[1].split('.')[0],
      sortable: true,
    },
    {
      name: "Action",
      cell: () => (
        <div className="status-box">
            <Btn className={`background-light-primary f-w-500`} color="">
                Refresh
            </Btn>
        </div>
      ),
    },
  ];

  const filteredItems = maApiLogsData?.data?.records?.filter((item: ProductListTableDataColumnType) => {
    console.log("filters", filters);
    console.log("item", item);
    
    const matchesApiName = filters?.id ? item?.id?.includes(filters.id) : true;
    const matchesApiUrl = filters?.token ? item?.token?.includes(filters.token) : true;
    const matchesStatus = filters?.status ? (filters.status !== 'Active' ? !item.status : item.status) : true;

    return matchesApiName && matchesApiUrl && matchesStatus;
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

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product-header">
                <AllUserProductListFilterHeader fetchMasterDashboardAllUsersData={fetchMasterDashboardAllUsersData} />
                <AllUsersCollapseFilterData onFilterChange={handleFilterChange} />
              </div>
              {
                maApiLogsData?.isLoading ? "Loading...":
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
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AllUsersTable;
