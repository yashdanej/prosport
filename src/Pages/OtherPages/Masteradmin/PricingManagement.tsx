import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const PricingManagement = () => {
  const [plans, setPlans] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [newFeature, setNewFeature] = useState<any>('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    // Replace with actual API call
    const mockPlans = [
      { id: 1, name: 'Basic', monthlyPrice: 9.99, yearlyPrice: 99.99, features: ['Feature 1', 'Feature 2'], status: 'Active' },
      { id: 2, name: 'Pro', monthlyPrice: 19.99, yearlyPrice: 199.99, features: ['Feature 1', 'Feature 2', 'Feature 3'], status: 'Active' },
      { id: 3, name: 'Enterprise', monthlyPrice: 49.99, yearlyPrice: 499.99, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], status: 'Active' },
    ];
    setPlans(mockPlans);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleEditPlan = (plan: any) => {
    setSelectedPlan({...plan});
    toggleModal();
  };

  const handleUpdatePlan = () => {
    // Implement plan update logic
    console.log('Updating plan:', selectedPlan);
    // After update, re-fetch the plans
    fetchPlans();
    toggleModal();
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setSelectedPlan({
        ...selectedPlan,
        features: [...selectedPlan.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: any) => {
    const updatedFeatures = selectedPlan.features.filter((_: any, i: any) => i !== index);
    setSelectedPlan({...selectedPlan, features: updatedFeatures});
  };

  const handleCreateNewPlan = () => {
    setSelectedPlan({
      id: Date.now(), // temporary id
      name: '',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [],
      status: 'Active'
    });
    toggleModal();
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Pricing Management</h1>
      <Button color="primary" onClick={handleCreateNewPlan} className="mb-3">Create New Plan</Button>
      <Table striped>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Monthly Price</th>
            <th>Yearly Price</th>
            <th>Features</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>${plan.monthlyPrice}</td>
              <td>${plan.yearlyPrice}</td>
              <td>{plan.features.join(', ')}</td>
              <td>{plan.status}</td>
              <td>
                <Button color="info" size="sm" onClick={() => handleEditPlan(plan)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>{selectedPlan?.id ? 'Edit Plan' : 'Create New Plan'}</ModalHeader>
        <ModalBody>
          {selectedPlan && (
            <Form>
              <FormGroup>
                <Label for="planName">Plan Name</Label>
                <Input
                  type="text"
                  name="planName"
                  id="planName"
                  value={selectedPlan.name}
                  onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                />
              </FormGroup>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="monthlyPrice">Monthly Price</Label>
                    <Input
                      type="number"
                      name="monthlyPrice"
                      id="monthlyPrice"
                      value={selectedPlan.monthlyPrice}
                      onChange={(e) => setSelectedPlan({...selectedPlan, monthlyPrice: parseFloat(e.target.value)})}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="yearlyPrice">Yearly Price</Label>
                    <Input
                      type="number"
                      name="yearlyPrice"
                      id="yearlyPrice"
                      value={selectedPlan.yearlyPrice}
                      onChange={(e) => setSelectedPlan({...selectedPlan, yearlyPrice: parseFloat(e.target.value)})}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label>Features</Label>
                {selectedPlan.features.map((feature: any, index: any) => (
                  <div key={index} className="d-flex mb-2">
                    <Input type="text" value={feature} readOnly className="me-2" />
                    <Button color="danger" size="sm" onClick={() => handleRemoveFeature(index)}>Remove</Button>
                  </div>
                ))}
                <div className="d-flex">
                  <Input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="New feature"
                    className="me-2"
                  />
                  <Button color="success" onClick={handleAddFeature}>Add Feature</Button>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={selectedPlan.status}
                  onChange={(e) => setSelectedPlan({...selectedPlan, status: e.target.value})}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Input>
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdatePlan}>
            {selectedPlan?.id ? 'Update Plan' : 'Create Plan'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default PricingManagement;