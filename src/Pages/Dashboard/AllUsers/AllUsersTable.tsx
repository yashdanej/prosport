import { Card, CardBody, Col, Container, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, P } from '../../../AbstractElements';
import { AppDispatch, RootState } from '../../../ReduxToolkit/Store';
import AllUserProductListFilterHeader from './AllUsersProductListFilterHeader';
import AllUsersCollapseFilterData from './AllUsersCollapseFilterData';
import { ChangeMasterAdminUsersPlan, ChangeUsersStatus } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import BottomRightToast from '../../../Componant/BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast';

export interface ProductListTableDataColumnType {
    userId: string;
    token: string;
    status: boolean;
    start_date: string;
    expire_date: string;
}

const AllUsersTable = ({fetchMasterDashboardAllUsersData}: any) => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.allUsers);
  const [filterText, setFilterText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    token: "",
    status: ""
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const ChangePlanStatus = async (id: number) => {
    try {
      console.log("ChangePlanStatus in");
      
      await dispatch(ChangeUsersStatus(id)).unwrap();
    } catch (error) {
      console.log("error from ChangePlanStatus", error);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setTxt('Copied to clipboard');
      setShowToast(true);
    }).catch(err => {
      setTxt(`Failed to copy ${err}`);
      setShowToast(true);
    });
  };

  const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
    {
      name: "Users ID",
      selector: (row) => row?.userId,
      sortable: true,
    },
    {
      name: "API KEY",
      cell: (row) => (
        <>
          <InputGroup className="has-validation">
            <InputGroupText className='pointer' onClick={() => handleCopy(`${row?.token}`)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-copy"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </InputGroupText>
          <Input
              style={{fontSize: '12px'}}
              disabled
              type="text"
              name="username"
              value={`${row?.token}`}
              className="form-control"
            />
          </InputGroup>
        </>
      ),
      sortable: true,
      grow: 2,
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
      cell: (row) => (
        <div className="status-box">
            <Btn onClick={() => ChangePlanStatus(+row.userId)} className={`background-light-primary f-w-500`} color="">
                {!row.status ? 'Activate' : 'De-Active'}
            </Btn>
        </div>
      ),
    },
  ];

  const filteredItems = maApiLogsData?.data?.records?.filter((item: ProductListTableDataColumnType) => {
    console.log("filters", filters);
    console.log("item", item);
    
    const matchesApiName = filters?.id ? item?.userId?.includes(filters.id) : true;
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
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Container>
  );
}

export default AllUsersTable;
