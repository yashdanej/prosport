// IntegrationsComponent.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardBody, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Badge } from 'reactstrap';

const IntegrationsComponent = () => {
  const [integrations, setIntegrations] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    // Replace with actual API call
    const mockIntegrations = [
      { id: 1, name: 'Google Analytics', status: 'Active' },
      { id: 2, name: 'Stripe', status: 'Inactive' },
      { id: 3, name: 'Mailchimp', status: 'Active' },
    ];
    setIntegrations(mockIntegrations);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleEditIntegration = (integration: any) => {
    setSelectedIntegration(integration);
    toggleModal();
  };

  const handleUpdateIntegration = () => {
    // Implement integration update logic
    console.log('Updating integration:', selectedIntegration);
    toggleModal();
  };

  return (
    <div className="page-body">
    <Card className="mt-4">
      <CardBody>
        <h3>Integrations</h3>
        <ListGroup>
          {integrations.map((integration: any) => (
            <ListGroupItem key={integration.id} className="d-flex justify-content-between align-items-center">
              {integration.name}
              <div>
                <Badge color={integration.status === 'Active' ? 'success' : 'secondary'} className="me-2">
                  {integration.status}
                </Badge>
                <Button color="info" size="sm" onClick={() => handleEditIntegration(integration)}>
                  Edit
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Integration</ModalHeader>
        <ModalBody>
          {selectedIntegration && (
            <Form>
              <FormGroup>
                <Label for="integrationName">Name</Label>
                <Input type="text" name="name" id="integrationName" value={selectedIntegration.name} readOnly />
              </FormGroup>
              <FormGroup>
                <Label for="integrationStatus">Status</Label>
                <Input type="select" name="status" id="integrationStatus" value={selectedIntegration.status} onChange={(e) => setSelectedIntegration({...selectedIntegration, status: e.target.value})}>
                  <option>Active</option>
                  <option>Inactive</option>
                </Input>
              </FormGroup>
              {/* Add more integration-specific fields here */}
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateIntegration}>Update</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Card>
    </div>
  );
};

export default IntegrationsComponent;