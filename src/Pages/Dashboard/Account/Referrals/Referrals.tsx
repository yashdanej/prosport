import React, { useEffect } from 'react'
import { Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H1, H3, H6, P, Progressbar } from '../../../../AbstractElements'
import './referralCss.css';
import { getMasterAdminUsersTableData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';


export interface ProductListTableDataColumnType {
    name: string;
    lastname: string;
    company_name: string;
    id: boolean;
    status: string;
    created_at: string;
}


const Referrals = () => {
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

      const data = [
        {
            title: 'Earning',
            amount: '127,589',
            percentage: '+16.70%'
        },
        {
            title: 'Profit',
            amount: '67,325',
            percentage: '-1.23%'
        },
        {
            title: 'Average Value',
            amount: '69.00',
            percentage: '+3.28%'
        },
        {
            title: 'Refund Rate',
            amount: '5,70%',
            percentage: '-1.42%'
        },
        
      ]
  return (
    <>
        <Col xl="12" md="12" className="proorder-md-1">
        <Row>
        <Col xl="6" sm="6">
        <Row>
            {
                data?.map((item) => {
                    return (
                        <Col xl="6" sm="6">
                            <Card>
                                <CardBody>
                                <div className='p-3 text-center'>
                                    <H6>{item.title}</H6>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', background: '#F8F9FA'}} className='p-4'>
                                    <H6>${item.amount}</H6>
                                    <H6 className='badge bg-primary'>{item.percentage}</H6>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }
            </Row>
            </Col>
            <Col xl="6" sm="6">
              <Card>
                <CommonCardHeader title="Referral Link" />
                <CardBody>
                  <div>
                    <p style={{fontWeight: 'bold', fontSize: '18px', color: '#3D475C'}}>Email The Referral Link</p>
                    <H6>Add Users email address and sent them referral link!</H6>
                    <Row style={{alignItems: 'center'}}>
                        <Col sm="8" md="8">
                            <FormGroup>
                                <Label>Validity Number</Label>
                                <Input type="number" name='validity_number' placeholder="Enter Validity Number" />
                            </FormGroup>
                        </Col>
                        <Col sm="4" md="4">
                            <Btn className='mr-3' tag="a" color="secondary">Send</Btn>
                        </Col>
                    </Row>
                  </div>
                  <hr />
                  <div className='referral-ma'>
                    <p style={{fontWeight: 'bold', fontSize: '18px', color: '#3D475C'}}>Share The Referral Link</p>
                    <H6>You can also share your referral link by copying and sending it to your friends or sharing it on social media.</H6>
                    <Row style={{alignItems: 'center'}}>
                        <Col className='my-3' sm="6" md="6">
                            <div className="group">
                                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                                </svg>
                                <input className="input" type="password" placeholder="password"/>
                            </div>
                        </Col>
                        <Col className='my-3' sm="6" md="6">
                            <div className="group">
                                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                                </svg>
                                <input className="input" type="password" placeholder="password"/>
                            </div>
                        </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>
      </Col>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
            <Col xl="12" sm="12">
                <div className='p-5' style={{ 
                    display: 'flex',
                    height: '75px', 
                    background: 'linear-gradient(to bottom right, black, red)',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    borderRadius: '15px'
                }}>
                    <div>
                        <H1 className='text-light'>Title</H1>
                        <H6 className='text-light'>Description</H6>
                    </div>
                    <div>
                        <Btn className='mr-3' tag="a" color="secondary">Download</Btn>
                    </div>
                </div>
            </Col>
        </Row>
      </Col>
      <Col xl="12" md="12" className="proorder-md-1 my-5">
        <Container fluid>
        {
            maApiLogsData?.data &&
        <Row>
            <Col sm="12">
            <Card>
                <CommonCardHeader title="Referred Users" />
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
      </Col>
    </>
  )
}

export default Referrals
