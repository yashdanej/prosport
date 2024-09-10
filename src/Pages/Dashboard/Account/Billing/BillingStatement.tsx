import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { Button, Card, CardBody, Col, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Btn, H2, H3, H6, Image, P, Progressbar } from '../../../../AbstractElements';
import { dynamicImage } from '../../../../Service';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ChangeMasterAdminUsersPlan, getMasterAdminBillingDetailsData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import { useLocation } from 'react-router-dom';
import InvoiceTwo from '../../../Application/Ecommerce/Invoices/Invoice-2/Invoice-2';
import html2pdf from "html2pdf.js";
import UpgradePlanModal from './UpgradePlanModal';


export interface ProductListTableDataColumnType {
    created_at: string;
    id: string;
    description: boolean;
    amount: string;
    status: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
}


const BillingStatement = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const maABillingData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.accountUsers.billing_statement);
    const [filterText, setFilterText] = useState("");
    const [filters, setFilters] = useState({
      id: "",
      status: ""
    });
    const [invoices, setInvoices] = useState([]);
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const invoiceContainerRef = useRef(null);

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

    const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
        {
          name: "DATE",
          selector: (row) => new Date(row?.created_at).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Kolkata',
          }),
          sortable: true,
        },
        {
          name: "INVOICE NO",
          selector: (row) => `PSA-001-${new Date(row?.created_at).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Kolkata',
          }).split('/').join('-')}`,
          sortable: true,
        },
        {
          name: "DESCRIPTION",
          selector: (row) => "No Description Found",
          sortable: true,
        },
        {
          name: "AMOUNT",
          selector: (row) => row?.amount,
          sortable: true,
        },
        {
          name: "STATUS",
          cell: (row) => (
            <span className={`badge bg-${row?.status?'success':'danger'}`}>{row?.status?"Paid":"Unpaid"}</span>
          ),
          sortable: true,
        },
        {
          name: "Action",
          cell: (row) => (
              <span className='badge bg-primary pointer' onClick={() => handleDownload(row)}>PDF</span>
          ),
        },
      ];

    const filteredItems = maABillingData?.data?.[1]?.invoices_and_billing_history?.filter((item: ProductListTableDataColumnType) => {
        console.log("filters", filters);
        console.log("item", item);
        
        const matchesApiName = filters?.id ? item?.id?.includes(filters.id) : true;
        // const matchesApiUrl = filters?.token ? item?.token?.includes(filters.token) : true;
        const matchesStatus = filters?.status ? (filters.status !== 'Active' ? !item.status : item.status) : true;
    
        return matchesApiName && matchesStatus;
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

      const location = useLocation();
      const id = location.pathname.split("/")[3];

      const dispatch = useDispatch<AppDispatch>();
      const fetchAccountUsersTable = async () => {
        try {
          console.log("fetchAccountUsersTable in");
          
          await dispatch(getMasterAdminBillingDetailsData(+id)).unwrap();
        } catch (error) {
          console.log("error from fetchAccountUsersTable", error);
        }
      }
      const ChangePlanStatus = async () => {
        try {
          console.log("ChangePlanStatus in");
          
          await dispatch(ChangeMasterAdminUsersPlan(+id)).unwrap();
        } catch (error) {
          console.log("error from ChangePlanStatus", error);
        }
      }

      useEffect(() => {
        const getInvoices = maABillingData?.data?.[1]?.invoices_and_billing_history.map((item: any) => {
          return {
            id: item?.id,
            date: new Date(item?.subscribe_date).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'Asia/Kolkata',
            }),
          }
        })
        console.log("getInvoices", getInvoices);
        
        setInvoices(getInvoices);
      }, [maABillingData]);
    
      useEffect(() => {
        fetchAccountUsersTable();
      }, [dispatch]);

    const handleDownload = (item: any) => {
        const addDays = (date: Date, days: number): Date => {
          const result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        };
        const billDate = new Date(item?.created_at);
        const plan = {
          name: item.name,
          api_call: item.api_call,
          api_calls: item.api_calls,
          validity: item.validity,
          status: item.status
        }
        const validityDays = plan ? parseInt(plan.validity, 10) : 0;
        const dueDate = addDays(billDate, validityDays);
    
        const data = {
          invoice: `PSA-001-${item?.created_at?.split("T")[0]}`,
          product: "Cricket",
          color: "danger",
          firstname: item?.firstname,
          lastname: item?.lastname,
          address: item?.address,
          phone: item?.phone,
          bill_date: item?.created_at?.split("T")[0],
          due_date: dueDate.toISOString().split("T")[0],
          price: item?.amount,
          tax: item?.amount * (18 / 100),
          amount: item?.amount + item?.amount * (18 / 100),
          plan: plan
        };

        const element = invoiceContainerRef.current;
        setInvoiceData(data);
        const opt = {
          margin: 0.02,
          filename: `${data.invoice}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: 'avoid-all' },
        };

        html2pdf().from(element).set(opt).save();
    }

  return (
    <>
     <div style={{ display: 'none' }}>
        <div ref={invoiceContainerRef}>
          <InvoiceTwo data={invoiceData} from="ma" />
        </div>
      </div>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
            <Col xl="8" sm="12">
              <Card>
                <CommonCardHeader title="Current Plan" />
                <CardBody>
                  <div className="d-flex flex-wrap gap-5 align-items-center">
                    <div className="">
                      <div className='my-4'>
                      <p style={{ fontSize: '18px', lineHeight: '10px' }}>
                        Active until {new Date(maABillingData?.data?.[0]?.current_plan?.[0]?.expire_date ?? "Expire or not subscribed").toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          timeZone: 'Asia/Kolkata',
                        })}
                      </p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>We will send you a notification upon Subscription expiration.</p>
                      </div>
                      <div className='my-4'>
                        <p style={{fontSize: '18px', lineHeight: '10px'}}>₹{maABillingData?.data?.[0]?.current_plan?.[0]?.amount ?? "Expire or not subscribed"} For {maABillingData?.data?.[0]?.current_plan?.[0]?.validity ?? "Expire or not subscribed"} <span className='badge bg-secondary'>{maABillingData?.data?.[0]?.current_plan?.[0]?.name}</span></p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>Standard plan for small to medium businesses.</p>
                      </div>
                      <div className='my-4'>
                        <p style={{fontSize: '18px', lineHeight: '10px'}}>**** **** **** **48 <span className='badge bg-primary'>Visa</span></p>
                        <p style={{fontSize: '16px', color: 'lightgray', lineHeight: '10px'}}>Last payment will be made by credit card.</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                        <Col md="12">
                            <div className="ttl-info text-start">
                                <H6 className='mb-2'>
                                    Days ({maABillingData?.data?.[0]?.current_plan?.[0]?.days_used ?? "Expire or not subscribed"} of {maABillingData?.data?.[0]?.current_plan?.[0]?.total_days ?? "Expire or not subscribed"} Days)
                                </H6>
                                <Progressbar animated={true} color={'success'} value={maABillingData?.data?.[0]?.current_plan?.[0]?.days_used_percentage ?? "Expire or not subscribed"} style={{ height: '5px' }} />
                                <H6 className='mt-2'>
                                    {maABillingData?.data?.[0]?.current_plan?.[0]?.days_left ?? "Expire or not subscribed"} days remaining until your plan requires update
                                </H6>
                                <div className='d-flex mt-4'>
                                    <Btn onClick={() => maABillingData?.data?.[0]?.current_plan?.[0]?.status?ChangePlanStatus():ChangePlanStatus()} className='mr-3' tag="a" color="secondary">{maABillingData?.data?.[0]?.current_plan?.[0]?.status?'Cancel Subscription':'Resume Plan'}</Btn>
                                    <Btn onClick={toggle} className='mx-3' tag="a" color="success">Upgrade Plan</Btn>
                                </div>
                                {/* modal */}
                                <UpgradePlanModal modal={modal} toggle={toggle} />
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
                                {
                                  invoices?.map((item: any) => {
                                    return (
                                      <option key={item?.id} value={item?.id}>{item?.date}</option>
                                    )
                                  })
                                }
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
