import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const UserRoles = () => {
  const [roles, setRoles] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [newRole, setNewRole] = useState<any>({ name: '', description: '' });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    // Replace with actual API call
    const mockRoles = [
      { id: 1, name: 'Admin', description: 'Full access to all features', userCount: 5 },
      { id: 2, name: 'Editor', description: 'Can edit content and manage users', userCount: 10 },
      { id: 3, name: 'Viewer', description: 'Read-only access to data', userCount: 50 },
    ];
    setRoles(mockRoles);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleCreateRole = () => {
    // Implement role creation logic
    console.log('Creating new role:', newRole);
    toggleModal();
    // After creation, re-fetch the roles
    fetchRoles();
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">User Roles</h1>
      <Button color="primary" onClick={toggleModal} className="mb-3">Create New Role</Button>
      <Table striped>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Description</th>
            <th>Number of Users</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role: any) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.userCount}</td>
              <td>
                <Button color="info" size="sm">Edit</Button>
                {' '}
                <Button color="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create New Role</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="roleName">Role Name</Label>
              <Input
                type="text"
                name="roleName"
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label for="roleDescription">Description</Label>
              <Input
                type="textarea"
                name="roleDescription"
                id="roleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateRole}>Create</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default UserRoles;