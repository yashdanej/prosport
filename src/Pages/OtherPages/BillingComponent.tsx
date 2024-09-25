import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Alert } from 'reactstrap';
import { Eye, Printer, Download, Bell, Search, Filter, DollarSign, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [invoices, setInvoices] = useState<any>([]);
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
    fetchInvoices();
    fetchNotifications();
    calculateAnalytics();
  }, []);

  const fetchInvoices = () => {
    // Simulated API call
    const mockInvoices = [
      { id: 1, invoiceNo: 'PSA-001-2024-07-09', products: 'Cricket', billDate: '2024-07-09', dueDate: '2024-07-10', price: 0, tax: 0, amount: 0, status: 'Paid' },
      { id: 2, invoiceNo: 'PSA-001-2024-07-16', products: 'Cricket', billDate: '2024-07-16', dueDate: '2024-07-17', price: 100, tax: 18, amount: 118, status: 'Unpaid' },
      { id: 3, invoiceNo: 'PSA-001-2024-07-16', products: 'Cricket', billDate: '2024-07-16', dueDate: '2024-07-17', price: 500, tax: 90, amount: 590, status: 'Paid' },
      // ... more invoice data
    ];
    setInvoices(mockInvoices);
  };

  const fetchNotifications = () => {
    // Simulated API call for notifications
    const mockNotifications = [
      { id: 1, message: 'New invoice generated', date: '2024-07-16' },
      { id: 2, message: 'Payment due in 3 days', date: '2024-07-14' },
      // ... more notifications
    ];
    setNotifications(mockNotifications);
  };

  const calculateAnalytics = () => {
    // This would typically be done on the server side
    const totalRevenue = invoices.reduce((sum: any, invoice: any) => sum + invoice.amount, 0);
    const pendingPayments = invoices.filter((invoice: any) => invoice.status === 'Unpaid').reduce((sum: any, invoice: any) => sum + invoice.amount, 0);
    const paidInvoices = invoices.filter((invoice: any) => invoice.status === 'Paid').length;
    const overdueInvoices = invoices.filter((invoice: any) => new Date(invoice.dueDate) < new Date() && invoice.status === 'Unpaid').length;

    setAnalytics({ totalRevenue, pendingPayments, paidInvoices, overdueInvoices });
  };

  const filteredInvoices = invoices.filter((invoice: any) => 
    (activeTab === 'all' || (activeTab === 'paid' && invoice.status === 'Paid') || (activeTab === 'unpaid' && invoice.status === 'Unpaid')) &&
    (invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.products.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!startDate || new Date(invoice.billDate) >= startDate) &&
    (!endDate || new Date(invoice.billDate) <= endDate)
  );

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

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
            onChange={(update) => setDateRange(update)}
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

      <Table responsive striped>
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
          {filteredInvoices.map((invoice: any) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNo}</td>
              <td><Badge color="danger">{invoice.products}</Badge></td>
              <td>{invoice.billDate}</td>
              <td>{invoice.dueDate}</td>
              <td>{invoice.price}</td>
              <td>{invoice.tax}</td>
              <td>{invoice.amount}</td>
              <td>
                <Badge color={invoice.status === 'Paid' ? 'success' : 'warning'}>
                  {invoice.status}
                </Badge>
              </td>
              <td>
                <Button color="primary" size="sm" className="me-2" onClick={() => handleViewInvoice(invoice)}>
                  <Eye size={18} />
                </Button>
                <Button color="secondary" size="sm" onClick={() => handlePrintInvoice(invoice)}>
                  <Printer size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Invoice Details</ModalHeader>
        <ModalBody>
          {selectedInvoice && (
            <Card>
              <CardBody>
                <h5>Invoice No: {selectedInvoice.invoiceNo}</h5>
                <p><strong>Products:</strong> {selectedInvoice.products}</p>
                <p><strong>Bill Date:</strong> {selectedInvoice.billDate}</p>
                <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                <p><strong>Price:</strong> ${selectedInvoice.price}</p>
                <p><strong>Tax:</strong> ${selectedInvoice.tax}</p>
                <p><strong>Total Amount:</strong> ${selectedInvoice.amount}</p>
                <p><strong>Status:</strong> 
                  <Badge color={selectedInvoice.status === 'Paid' ? 'success' : 'warning'}>
                    {selectedInvoice.status}
                  </Badge>
                </p>
              </CardBody>
            </Card>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
          <Button color="primary" onClick={() => handlePrintInvoice(selectedInvoice)}>Print</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={notificationModalOpen} toggle={() => setNotificationModalOpen(!notificationModalOpen)}>
        <ModalHeader toggle={() => setNotificationModalOpen(!notificationModalOpen)}>Notifications</ModalHeader>
        <ModalBody>
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <Alert key={notification.id} color="info" className="mb-2">
                <strong>{notification.date}:</strong> {notification.message}
              </Alert>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </ModalBody>
      </Modal>
    </Container>
    </div>
  );
};

export default BillingComponent;