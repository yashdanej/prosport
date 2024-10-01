import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Label, Tooltip, Modal, ModalBody, ModalHeader, Button, Card, CardBody, Row, Col, Container, NavLink, Nav, NavItem, Badge } from 'reactstrap';
import html2pdf from 'html2pdf.js';
import { AppDispatch, RootState } from '../../ReduxToolkit/Store';
import { getBilling, getSubscribe } from '../../ReduxToolkit/Reducers/Change/Subscribe';
import InvoiceTwo from '../Application/Ecommerce/Invoices/Invoice-2/Invoice-2';
import { AlertTriangle, Bell, Calendar, CreditCard, DollarSign, Download, Eye, Printer } from 'react-feather';
import { CSVLink } from 'react-csv';
import DatePicker from "react-datepicker";

const AnalyticsCard = ({ title, value, icon: Icon, color }: any) => (
  <Card className="mb-4">
    <CardBody>
      <Row>
        <Col>
          <h6 className="text-muted mb-1">{title}</h6>
          <h3 className="mb-0">{value}</h3>
        </Col>
        <Col xs="auto">
          <div className={`bg-${color} rounded-circle p-3`}>
            <Icon size={24} color="white" />
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const BillingComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('all');
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [notificationModalOpen, setNotificationModalOpen] = useState<any>(false);
  const [analytics, setAnalytics] = useState<any>({
    totalRevenue: 0,
    pendingPayments: 0,
    paidInvoices: 0,
    overdueInvoices: 0
  });

  useEffect(() => {
    fetchNotifications();
    calculateAnalytics();
  }, []);

  const fetchNotifications = () => {
    // Simulated API call for notifications
    const mockNotifications = [
      { id: 1, message: 'New invoice generated', date: '2024-07-16' },
      { id: 2, message: 'Payment due in 3 days', date: '2024-07-14' },
      // ... more notifications
    ];
    setNotifications(mockNotifications);
  };
  const [invoiceData, setInvoiceData] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const invoiceContainerRef = useRef(null);

  const billingData = useSelector((state: RootState) => state.subscribe.billing);
  const plansData = useSelector((state: RootState) => state.subscribe.plans);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBilling());
    dispatch(getSubscribe());
  }, [dispatch]);

  const toggleTooltip = (id: string) => {
    setTooltipOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const data = billingData?.data?.map((item: any, i: number) => {
    const billDate = new Date(item?.created_at);
    const plan = plansData?.data?.find((plan: any) => plan.id === item.plan_id);
    const validityDays = plan ? parseInt(plan.validity, 10) : 0;
    const dueDate = addDays(billDate, validityDays);

    return {
      invoice: `PSA-001-${item?.created_at?.split("T")[0]}`,
      product: "Cricket",
      color: "danger",
      bill_date: item?.created_at?.split("T")[0],
      due_date: dueDate.toISOString().split("T")[0],
      price: item?.amount,
      tax: item?.amount * (18 / 100),
      status: item?.amount?"Paid":"Unpaid",
      amount: item?.amount + item?.amount * (18 / 100),
      plan: plan
    };
  });

  const handleDownloadPdf = (invoiceData: any) => {
    const element = invoiceContainerRef.current;
    setInvoiceData(invoiceData);
    const opt = {
      margin: 0.02,
      filename: `${invoiceData.invoice}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' },
    };

    html2pdf().from(element).set(opt).save();
  };

  const handleViewInvoice = (invoiceData: any) => {
    setInvoiceData(invoiceData);
    toggleModal();
  };

  const calculateAnalytics = () => {
    // This would typically be done on the server side
    const totalRevenue = data?.reduce((sum: any, invoice: any) => sum + invoice.amount, 0);
    const pendingPayments = data?.filter((invoice: any) => invoice.status === 'Unpaid').reduce((sum: any, invoice: any) => sum + invoice.amount, 0);
    const paidInvoices = data?.filter((invoice: any) => invoice.status === 'Paid').length;
    const overdueInvoices = data?.filter((invoice: any) => new Date(invoice.due_date) < new Date() && invoice.status === 'Unpaid').length;

    setAnalytics({ totalRevenue, pendingPayments, paidInvoices, overdueInvoices });
  };

  const filteredInvoices = data && data?.filter((invoice: any) => 
    (activeTab === 'all' || (activeTab === 'paid' && invoice?.status === 'Paid') || (activeTab === 'unpaid' && invoice?.status === 'Unpaid')) &&
    (invoice?.invoice?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice?.status?.toLowerCase() == searchTerm.toLowerCase() ||
     invoice?.product?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!startDate || new Date(invoice?.bill_date) >= startDate) &&
    (!endDate || new Date(invoice?.bill_date) <= endDate)
  );

  const handlePrintInvoice = (invoice: any) => {
    // Implement print functionality
    console.log('Printing invoice:', invoice.invoiceNo);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Billing Management</h1>
      
      <Row className="mb-4">
        <Col md={3}>
          <AnalyticsCard title="Total Generate" value={`$${analytics.totalRevenue.toFixed(2)}`} icon={DollarSign} color="success" />
        </Col>
        <Col md={3}>
          <AnalyticsCard title="Pending Payments" value={`$${analytics.pendingPayments.toFixed(2)}`} icon={CreditCard} color="warning" />
        </Col>
        <Col md={3}>
          <AnalyticsCard title="Paid Invoices" value={analytics.paidInvoices} icon={Calendar} color="info" />
        </Col>
        <Col md={3}>
          <AnalyticsCard title="Overdue Invoices" value={analytics.overdueInvoices} icon={AlertTriangle} color="danger" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => setDateRange(update)}
            isClearable={true}
            placeholderText="Select date range"
            className="form-control"
          />
        </Col>
        <Col md={3}>
          <CSVLink
            data={filteredInvoices}
            filename={"invoices.csv"}
            className="btn btn-primary"
          >
            <Download size={18} className="me-2" />
            Export to CSV
          </CSVLink>
        </Col>
        <Col md={3}>
          <Button color="info" onClick={() => setNotificationModalOpen(true)}>
            <Bell size={18} className="me-2" />
            Notifications ({notifications.length})
          </Button>
        </Col>
      </Row>

      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Invoices
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'paid' ? 'active' : ''}
            onClick={() => setActiveTab('paid')}
          >
            Paid
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'unpaid' ? 'active' : ''}
            onClick={() => setActiveTab('unpaid')}
          >
            Unpaid
          </NavLink>
        </NavItem>
      </Nav>

      <div style={{ display: 'none' }}>
        <div ref={invoiceContainerRef}>
          <InvoiceTwo data={invoiceData} />
        </div>
      </div>

      <Table responsive>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Products</th>
            <th>Bill Date</th>
            <th>Due Date</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices?.map((item: any, i: number) => (
            <tr key={i}>
              <td>{item.invoice}</td>
              <td className="project-dot">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <span className={`badge bg-${item.color}`} />
                  </div>
                  <div className="flex-grow-1">
                    <Badge color="danger">{item.product}</Badge>
                  </div>
                </div>
              </td>
              <td>{item.bill_date}</td>
              <td>{item.due_date}</td>
              <td>{item.price}</td>
              <td>{item.tax}</td>
              <td>{item.amount}</td>
              <td>
                <Badge color={item.status === 'Paid' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              </td>
              <td className="icon-lists">
                <Button color="primary" id={`icon-view-${i}`} size="sm" className="me-2" onClick={() => handleViewInvoice(item)}>
                  <Eye size={18} />
                </Button>
                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen[`icon-view-${i}`]}
                  target={`icon-view-${i}`}
                  toggle={() => toggleTooltip(`icon-view-${i}`)}
                >
                  View invoice
                </Tooltip>
                <Button id={`icon-pdf-${i}`} color="secondary" size="sm" onClick={() => handlePrintInvoice(item)}>
                  <Printer size={18} />
                </Button>
                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen[`icon-pdf-${i}`]}
                  target={`icon-pdf-${i}`}
                  toggle={() => toggleTooltip(`icon-pdf-${i}`)}
                >
                  Download invoice
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Invoice</ModalHeader>
        <ModalBody>
          <InvoiceTwo data={invoiceData} />
        </ModalBody>
        <div className="text-end p-3">
          <Button color="primary" onClick={() => handleDownloadPdf(invoiceData)}>Download PDF</Button>
        </div>
      </Modal>
      </Container>
    </div>
  );
};

export default BillingComponent;