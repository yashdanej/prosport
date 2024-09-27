import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Input } from 'reactstrap';

const Permissions = () => {
  const [permissions, setPermissions] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = async () => {
    // Replace with actual API call
    const mockPermissions = [
      { id: 1, name: 'View Users' },
      { id: 2, name: 'Edit Users' },
      { id: 3, name: 'Delete Users' },
      { id: 4, name: 'Manage Roles' },
      { id: 5, name: 'Access API' },
    ];
    setPermissions(mockPermissions);
  };

  const fetchRoles = async () => {
    // Replace with actual API call
    const mockRoles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Editor' },
      { id: 3, name: 'Viewer' },
    ];
    setRoles(roles);
  };

  const togglePermission = (roleId: any, permissionId: any) => {
    // Implement permission toggle logic
    console.log(`Toggling permission ${permissionId} for role ${roleId}`);
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Permissions</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Permission</th>
            {roles.map((role: any) => (
              <th key={role.id}>{role.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission: any) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              {roles.map((role: any) => (
                <td key={role.id}>
                  <Input
                    type="checkbox"
                    onChange={() => togglePermission(role.id, permission.id)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="primary">Save Changes</Button>
    </Container>
    </div>
  );
};

export default Permissions;