import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [newKeyName, setNewKeyName] = useState<any>('');

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    // Replace with actual API call
    const mockKeys = [
      { id: 1, name: 'Production Key', key: 'prod_key_123', status: 'Active' },
      { id: 2, name: 'Development Key', key: 'dev_key_456', status: 'Active' },
      { id: 3, name: 'Test Key', key: 'test_key_789', status: 'Inactive' },
    ];
    setApiKeys(mockKeys);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleCreateKey = () => {
    // Implement key creation logic
    console.log('Creating new key:', newKeyName);
    toggleModal();
    // After creation, re-fetch the keys
    fetchAPIKeys();
  };

  const handleRevokeKey = (keyId: any) => {
    // Implement key revocation logic
    console.log('Revoking key:', keyId);
    // After revocation, re-fetch the keys
    fetchAPIKeys();
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">API Keys</h1>
      <Button color="primary" onClick={toggleModal} className="mb-3">Create New API Key</Button>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Key</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key: any) => (
            <tr key={key.id}>
              <td>{key.name}</td>
              <td>{key.key}</td>
              <td>{key.status}</td>
              <td>
                <Button color="danger" size="sm" onClick={() => handleRevokeKey(key.id)}>Revoke</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create New API Key</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="keyName">Key Name</Label>
              <Input 
                type="text" 
                name="keyName" 
                id="keyName" 
                placeholder="Enter key name" 
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateKey}>Create</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default APIKeys;