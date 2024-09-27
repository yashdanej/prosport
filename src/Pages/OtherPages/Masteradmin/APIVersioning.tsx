import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'reactstrap';

const APIVersioning = () => {
  const [versions, setVersions] = useState<any>([]);

  useEffect(() => {
    fetchAPIVersions();
  }, []);

  const fetchAPIVersions = async () => {
    // Replace with actual API call
    const mockVersions = [
      { version: 'v1', status: 'Deprecated', releaseDate: '2022-01-01', endOfLife: '2023-12-31' },
      { version: 'v2', status: 'Active', releaseDate: '2023-01-01', endOfLife: null },
      { version: 'v3', status: 'Beta', releaseDate: '2023-09-01', endOfLife: null },
    ];
    setVersions(mockVersions);
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">API Versioning</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Version</th>
            <th>Status</th>
            <th>Release Date</th>
            <th>End of Life</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((v: any, index: any) => (
            <tr key={index}>
              <td>{v.version}</td>
              <td>
                <Badge color={
                  v.status === 'Active' ? 'success' : 
                  v.status === 'Deprecated' ? 'warning' : 
                  'info'
                }>
                  {v.status}
                </Badge>
              </td>
              <td>{v.releaseDate}</td>
              <td>{v.endOfLife || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
};

export default APIVersioning;