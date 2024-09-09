import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Btn, P } from '../../../AbstractElements';
import { RootState } from '../../../ReduxToolkit/Store';

export interface ProductListTableDataColumnType {
    endpoint_name: string;
    endpoint: string;
    failed: boolean;
    created_at: string;
}

const StatusApiLogTable = () => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.apiLog);
  const [filterText, setFilterText] = useState("");
  const [filters, setFilters] = useState({
    apiName: "",
    apiUrl: "",
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
      name: "API's NAME",
      selector: (row) => row.endpoint_name,
      sortable: true,
    },
    {
      name: "API URL",
      selector: (row) => row.endpoint,
      sortable: true,
    },
    {
      name: "STATUS",
      cell: (row) => (
        <div className="status-box">
            <Btn className={`background-light-${row.failed ? 'danger' : 'success'} font-${row.failed ? 'danger' : 'success'} f-w-500`} color="">
                {row.failed ? 'Failure' : 'Success'}
            </Btn>
        </div>
      ),
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.created_at.split('T')[0],
      sortable: true,
    },
    {
      name: "TIME",
      selector: (row) => row.created_at.split('T')[1].split('.')[0],
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

  const filteredItems = maApiLogsData?.data?.getLogs?.filter((item: ProductListTableDataColumnType) => {
    console.log("filters", filters);
    console.log("item", item);
    
    const matchesApiName = filters?.apiName ? item?.endpoint_name?.includes(filters.apiName) : true;
    const matchesApiUrl = filters?.apiUrl ? item?.endpoint?.includes(filters.apiUrl) : true;
    const matchesStatus = filters?.status ? (filters.status === 'Success' ? !item.failed : item.failed) : true;

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
                <ProductListFilterHeader />
                <CollapseFilterData onFilterChange={handleFilterChange} />
              </div>
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
    </Container>
  );
}

export default StatusApiLogTable;
