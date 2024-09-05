import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H1, H3, H6, P, Progressbar } from '../../../../AbstractElements'
import './referralCss.css';
import { getMasterAdminRefferalsData, getMasterAdminUsersTableData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { useDispatch, useSelector } from 'react-redux';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useLocation } from 'react-router-dom';
import { Field } from 'formik';
import { FRONTEND_URL } from '../../../../Utils';
import BottomRightToast from '../../../../Componant/BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast';

export interface ProductListTableDataColumnType {
    id: string;
    created_at: string;
    name: string;
    lastname: string;
    bonus: string;
    commission: string;
}

const Referrals = () => {
    const maRefferalsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.refferals);
    const [showToast, setShowToast] = useState(false);
    const [txt, setTxt] = useState("");
      const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
        {
          name: "ID",
          selector: (row) => row?.id,
          sortable: true,
        },
        {
          name: "DATE",
          selector: (row) =>
            new Date(row?.created_at).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Asia/Kolkata',
            }),
          sortable: true,
        },
        {
          name: "USER",
          selector: (row) => `${row?.name} ${row?.lastname?row?.lastname:""}`,
          sortable: true,
        },
        {
          name: "BONNUS",
          selector: (row) => "5%",
          sortable: true,
        },
        {
          name: "PROFIT",
          selector: (row) => `₹${row?.commission}`,
          sortable: true,
        },
      ];

      const location = useLocation();
      const id = location.pathname.split("/")[3];

      const dispatch = useDispatch<AppDispatch>();
      const fetchRefferalTable = async () => {
        try {
          console.log("fetchRefferalTable in");
          
          await dispatch(getMasterAdminRefferalsData(+id)).unwrap();
        } catch (error) {
          console.log("error from fetchRefferalTable", error);
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
    
      useEffect(() => {
        fetchRefferalTable();
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
                    <Col className="my-3" sm="6" md="8">
                      <InputGroup className="has-validation">
                        <InputGroupText className='pointer' onClick={() => handleCopy(`${FRONTEND_URL}/authentication/register_simple/${maRefferalsData?.data?.[0]?.user?.[0]?.reffer_code}`)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
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
                          disabled
                          type="text"
                          name="username"
                          value={`${FRONTEND_URL}/authentication/register_simple/${maRefferalsData?.data?.[0]?.user?.[0]?.reffer_code}`}
                          className="form-control"
                        />
                        <div className="invalid-tooltip">UsernameFeedback</div>
                      </InputGroup>
                    </Col>
                        <Col className='my-3' sm="4" md="4">
                          <InputGroup className="has-validation">
                            <InputGroupText className='pointer' onClick={() => handleCopy(`${maRefferalsData?.data?.[0]?.user?.[0]?.reffer_code}`)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
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
                            <Input disabled={true} type="text" name="username" value={maRefferalsData?.data?.[0]?.user?.[0]?.reffer_code} className={`form-control`} />
                            <div className="invalid-tooltip">{"UsernameFeedback"}</div>
                          </InputGroup>
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
          maRefferalsData?.data?.[0]?.refferers &&
        <Row>
            <Col sm="12">
            <Card>
                <CommonCardHeader title="Referred Users" />
                <CardBody>
                <div className="list-product">
                    <div className="table-responsive">
                    <DataTable
                        data={maRefferalsData?.data?.[0]?.refferers} 
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
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </>
  )
}

export default Referrals
