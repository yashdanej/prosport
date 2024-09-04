import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../ReduxToolkit/Store';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import { Btn, H2, H3, H6, Image, P, Progressbar } from '../../../../AbstractElements';
import { dynamicImage } from '../../../../Service';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import DataTable, { TableColumn } from 'react-data-table-component';


export interface ProductListTableDataColumnType {
    id: string;
    token: string;
    status: boolean;
    start_date: string;
    expire_date: string;
}


const BillingStatement = () => {
    const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);
    const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.allUsers);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState({
      id: "",
      token: "",
      status: ""
    });
    const [topCards, setTopCards]: any = useState([]);
    useEffect(() => {
      setTopCards(
        [
            {
                student: dashData?.data?.response?.newRegistration,
                title:"New Registration",
                color:"success",
                icon:"up",
                percentage:"+27.02%",
                detail:"than last 4 Month",
                image:"teacher.png",
                class:"student-2"
            },
            {
                student: dashData?.data?.response?.newSubscription,
                title:"New Subscription",
                color:"success",
                icon:"up",
                percentage:"+27.02%",
                detail:"than last 4 Month",
                image:"teacher.png",
                class:"student-2"
            },
            {
                student: dashData?.data?.response?.expiredSubscription,
                title:"Expire Subscription",
                color:"success",
                icon:"up",
                percentage:"+27.02%",
                detail:"than last 4 Month",
                image:"teacher.png",
                class:"student-2"
            }
        ]
        )
    }, [dashData]);

   

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
          grow: 2,
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
            <>
                <P>Refresh</P>
            </>
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
    <>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
            <Col xl="8" sm="12">
              <Card>
                <CommonCardHeader title="Current Plan" />
                <CardBody>
                  <div className="d-flex flex-wrap gap-5 align-items-center">
                    <div className="">
                      <div className='my-4'>
                        <p style={{fontSize: '18px', lineHeight: '10px'}}>Active until Apr 09, 2023</p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>We will send you a notification upon Subscription expiration.</p>
                      </div>
                      <div className='my-4'>
                        <p style={{fontSize: '18px', lineHeight: '10px'}}>Active until Apr 09, 2023 <span className='badge bg-secondary'>Basic Plan</span></p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>We will send you a notification upon Subscription expiration.</p>
                      </div>
                      <div className='my-4'>
                        <p style={{fontSize: '18px', lineHeight: '10px'}}>Active until Apr 09, 2023 <span className='badge bg-primary'>Visa</span></p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>We will send you a notification upon Subscription expiration.</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                        <Col md="12">
                            <div className="ttl-info text-start">
                                <H6 className='mb-2'>
                                    Days (16 of 30 Days)
                                </H6>
                                <Progressbar animated={true} color={'success'} value={60} style={{ height: '5px' }} />
                                <H6 className='mt-2'>
                                    14 days remaining until your plan requires update
                                </H6>
                                <div className='d-flex mt-4'>
                                    <Btn className='mr-3' tag="a" color="secondary">Cancel Subscription</Btn>
                                    <Btn className='mx-3' tag="a" color="success">Upgrade Plan</Btn>
                                </div>
                            </div>
                        </Col>
                        </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4" sm="6">
              <Card>
                <CommonCardHeader title="View Invoices" />
                <CardBody>
                  <div>
                    <H6>You can download the invoice for the month you want by selecting it from the list.</H6>
                    <Row>
                        <Col className='my-3' sm="6" md="6">
                            <Input id="validity" name="validity_time" type="select" required>
                                <option value={""}>Choose...</option>
                                <option value={"days"}>Days</option>
                                <option value={"months"}>Months</option>
                            </Input>
                        </Col>
                        <Col className='my-3' sm="6" md="6">
                            <Btn className='mr-3' tag="a" color="secondary">Download</Btn>
                        </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>
      </Col>
      <Col xl="12" md="12" className="proorder-md-1">
            <Container fluid>
                <Row>
                    <Col sm="12">
                    <Card>
                        <CommonCardHeader title="Billing History" />
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
            </Container>
      </Col>
    </>
  )
}

export default BillingStatement
