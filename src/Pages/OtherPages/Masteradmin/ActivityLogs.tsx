import React, { useState, useEffect } from 'react';
import { Container, Table, Input, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ActivityLogs = () => {
  const [logs, setLogs] = useState<any>([]);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [searchTerm, setSearchTerm] = useState<any>('');

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]);

  const fetchLogs = async () => {
    // Replace with actual API call
    const mockLogs = [
      { id: 1, userId: 1, action: 'User Login', timestamp: '2023-09-28 10:30:00', details: 'User logged in from 192.168.1.1' },
      { id: 2, userId: 2, action: 'Content Edit', timestamp: '2023-09-28 11:15:00', details: 'User edited article #123' },
      { id: 3, userId: 1, action: 'API Access', timestamp: '2023-09-28 12:00:00', details: 'User accessed /api/users endpoint' },
    ];
    setLogs(mockLogs);
  };

  const filteredLogs = logs.filter((log: any) => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Activity Logs</h1>
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
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button color="primary">Export Logs</Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User ID</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log: any) => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.userId}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
};

export default ActivityLogs;