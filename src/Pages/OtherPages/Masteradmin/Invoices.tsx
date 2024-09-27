import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [searchTerm, setSearchTerm] = useState<any>('');

  useEffect(() => {
    fetchInvoices();
  }, [startDate, endDate]);

  const fetchInvoices = async () => {
    // Replace with actual API call
    const mockInvoices = [
      { id: 1, invoiceNumber: 'INV-001', userId: 1, amount: 100, status: 'Paid', date: '2023-09-01' },
      { id: 2, invoiceNumber: 'INV-002', userId: 2, amount: 200, status: 'Unpaid', date: '2023-09-15' },
      { id: 3, invoiceNumber: 'INV-003', userId: 3, amount: 150, status: 'Overdue', date: '2023-08-30' },
    ];
    setInvoices(mockInvoices);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    toggleModal();
  };

  const handleSendReminder = (invoiceId: any) => {
    // Implement send reminder logic
    console.log('Sending reminder for invoice:', invoiceId);
  };

  const filteredInvoices = invoices.filter((invoice: any) => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
    new Date(invoice.date) >= startDate &&
    new Date(invoice.date) <= endDate
  );

  return (
    <div className='page-body'>
    <Container fluid>
      <h1 className="mb-4">Invoices</h1>
      <div className="d-flex mb-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control me-2"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control me-2"
        />
        <Input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button color="primary">Export Invoices</Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice: any) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.userId}</td>
              <td>${invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>{invoice.date}</td>
              <td>
                <Button color="info" size="sm" onClick={() => handleViewInvoice(invoice)}>View</Button>
                {' '}
                {invoice.status !== 'Paid' && (
                  <Button color="warning" size="sm" onClick={() => handleSendReminder(invoice.id)}>Send Reminder</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Invoice Details</ModalHeader>
        <ModalBody>
          {selectedInvoice && (
            <div>
              <h4>Invoice {selectedInvoice.invoiceNumber}</h4>
              <p><strong>User ID:</strong> {selectedInvoice.userId}</p>
              <p><strong>Amount:</strong> ${selectedInvoice.amount}</p>
              <p><strong>Status:</strong> {selectedInvoice.status}</p>
              <p><strong>Date:</strong> {selectedInvoice.date}</p>
              {/* Add more invoice details here */}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default Invoices;