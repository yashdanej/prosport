import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Btn, P } from '../../../AbstractElements';
import { RootState } from '../../../ReduxToolkit/Store';
import AllUserProductListFilterHeader from './UsersInvoiceProductListFilterHeader';
import AllUsersCollapseFilterData from './UsersInvoiceCollapseFilterData';
import UsersInvoiceProductListFilterHeader from './UsersInvoiceProductListFilterHeader';
import UsersInvoiceCollapseFilterData from './UsersInvoiceCollapseFilterData';

export interface ProductListTableDataColumnType {
    id: string;
    name: string;
    company: boolean;
    date: string;
    status: string;
    amount: string;
}

const UsersInvoiceTable = ({fetchMasterDashboardUsersInvoiceData}: any) => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.usersInvoice);
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    status: ""
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };
  const activeColor = (status: string) => {
    if(status === 'Free'){
      return '#FCDE70';
    }else if(status === 'Paid'){
      return '#88D66C';
    }else if(status === 'Cancel'){
      return '#C96868';
    }else{
      return '#6495ED';
    }
  }
  const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
      grow: 2,
    },
    {
      name: "NAME",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "COMPANY",
      selector: (row) => row?.company || "No company name",
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row?.date?.split('T')[0],
      sortable: true,
    },
    {
      name: "STATUS",
      cell: (row) => (
        <div className="status-box">
            <Btn style={{background: activeColor(row.status)}} color="">
                {row.status}
            </Btn>
        </div>
      ),
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row?.amount,
      sortable: true,
    },
    {
      name: "Action",
      cell: () => (
        <div className="status-box">
            <Btn className={`background-light-${'primary'} f-w-500`} color="">
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
    const matchesApiUrl = filters?.name ? item?.name?.includes(filters.name) : true;
    // const matchesStatus = filters?.status ? (filters.status !== 'Active' ? !item.status : item.status) : true;

    // return matchesApiName && matchesApiUrl && matchesStatus;
    return matchesApiName && matchesApiUrl;
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
                <UsersInvoiceProductListFilterHeader fetchMasterDashboardUsersInvoiceData={fetchMasterDashboardUsersInvoiceData} />
                <UsersInvoiceCollapseFilterData onFilterChange={handleFilterChange} />
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

export default UsersInvoiceTable;
