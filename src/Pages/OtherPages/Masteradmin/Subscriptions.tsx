import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [filterStartDate, setFilterStartDate] = useState<any>(null);
  const [filterEndDate, setFilterEndDate] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<any>('all');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    // Replace with actual API call
    const mockSubscriptions = [
      { id: 1, userId: 1, plan: 'Basic', status: 'Active', startDate: '2023-01-01', nextBillingDate: '2023-10-01', amount: 9.99 },
      { id: 2, userId: 2, plan: 'Pro', status: 'Active', startDate: '2023-02-15', nextBillingDate: '2023-10-15', amount: 19.99 },
      { id: 3, userId: 3, plan: 'Enterprise', status: 'Cancelled', startDate: '2023-03-01', nextBillingDate: null, amount: 49.99 },
    ];
    setSubscriptions(mockSubscriptions);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleViewSubscription = (subscription: any) => {
    setSelectedSubscription(subscription);
    toggleModal();
  };

  const handleCancelSubscription = (subscriptionId: any) => {
    // Implement subscription cancellation logic
    console.log('Cancelling subscription:', subscriptionId);
    // After cancellation, re-fetch the subscriptions
    fetchSubscriptions();
  };

  const handleUpdateSubscription = () => {
    // Implement subscription update logic
    console.log('Updating subscription:', selectedSubscription);
    // After update, re-fetch the subscriptions
    fetchSubscriptions();
    toggleModal();
  };

  const filteredSubscriptions = subscriptions.filter((subscription: any) => 
    (subscription.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
     subscription.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || subscription.status === filterStatus) &&
    (!filterStartDate || new Date(subscription.startDate) >= filterStartDate) &&
    (!filterEndDate || new Date(subscription.startDate) <= filterEndDate)
  );

  return (
    <div className='page-body'>
    <Container fluid>
      <h1 className="mb-4">Subscriptions</h1>
      <Row className="mb-3">
        <Col md={3}>
          <Input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Input
            type="select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
          </Input>
        </Col>
        <Col md={3}>
          <DatePicker
            selected={filterStartDate}
            onChange={(date) => setFilterStartDate(date)}
            selectsStart
            startDate={filterStartDate}
            endDate={filterEndDate}
            placeholderText="Start Date"
            className="form-control"
          />
        </Col>
        <Col md={3}>
          <DatePicker
            selected={filterEndDate}
            onChange={(date) => setFilterEndDate(date)}
            selectsEnd
            startDate={filterStartDate}
            endDate={filterEndDate}
            minDate={filterStartDate}
            placeholderText="End Date"
            className="form-control"
          />
        </Col>
      </Row>
      <Table striped>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Next Billing Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscriptions.map((subscription: any) => (
            <tr key={subscription.id}>
              <td>{subscription.userId}</td>
              <td>{subscription.plan}</td>
              <td>{subscription.status}</td>
              <td>{subscription.startDate}</td>
              <td>{subscription.nextBillingDate || 'N/A'}</td>
              <td>${subscription.amount}</td>
              <td>
                <Button color="info" size="sm" onClick={() => handleViewSubscription(subscription)} className="me-2">View</Button>
                {subscription.status === 'Active' && (
                  <Button color="danger" size="sm" onClick={() => handleCancelSubscription(subscription.id)}>Cancel</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Subscription Details</ModalHeader>
        <ModalBody>
          {selectedSubscription && (
            <Form>
              <FormGroup>
                <Label for="userId">User ID</Label>
                <Input type="text" name="userId" id="userId" value={selectedSubscription.userId} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="plan">Plan</Label>
                <Input type="select" name="plan" id="plan" value={selectedSubscription.plan} onChange={(e) => setSelectedSubscription({...selectedSubscription, plan: e.target.value})}>
                  <option>Basic</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input type="select" name="status" id="status" value={selectedSubscription.status} onChange={(e) => setSelectedSubscription({...selectedSubscription, status: e.target.value})}>
                  <option>Active</option>
                  <option>Cancelled</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input type="date" name="startDate" id="startDate" value={selectedSubscription.startDate} onChange={(e) => setSelectedSubscription({...selectedSubscription, startDate: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label for="nextBillingDate">Next Billing Date</Label>
                <Input type="date" name="nextBillingDate" id="nextBillingDate" value={selectedSubscription.nextBillingDate || ''} onChange={(e) => setSelectedSubscription({...selectedSubscription, nextBillingDate: e.target.value})} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input type="number" name="amount" id="amount" value={selectedSubscription.amount} onChange={(e) => setSelectedSubscription({...selectedSubscription, amount: parseFloat(e.target.value)})} />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateSubscription}>Update</Button>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default Subscriptions;