import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap';

const UserList = () => {
  const [users, setUsers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Replace with actual API call
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    ];
    setUsers(mockUsers);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    toggleModal();
  };

  const handleUpdateUser = () => {
    // Implement user update logic
    console.log('Updating user:', selectedUser);
    toggleModal();
    // After update, re-fetch the users
    fetchUsers();
  };

  const filteredUsers = users.filter((user: any) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">User List</h1>
      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user:any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <Button color="primary" size="sm" onClick={() => handleEditUser(user)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit User</ModalHeader>
        <ModalBody>
          {selectedUser && (
            <Form>
              <FormGroup>
                <Label for="userName">Name</Label>
                <Input
                  type="text"
                  name="userName"
                  id="userName"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userEmail">Email</Label>
                <Input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userRole">Role</Label>
                <Input
                  type="select"
                  name="userRole"
                  id="userRole"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="userStatus">Status</Label>
                <Input
                  type="select"
                  name="userStatus"
                  id="userStatus"
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Input>
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateUser}>Update</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default UserList;