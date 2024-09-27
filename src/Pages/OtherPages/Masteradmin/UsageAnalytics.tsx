import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsageAnalytics = () => {
  const [usageData, setUsageData] = useState<any>(null);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    // Replace with actual API call
    const mockData = {
      dailyUsage: [
        { date: '2023-09-01', requests: 50000 },
        { date: '2023-09-02', requests: 55000 },
        { date: '2023-09-03', requests: 48000 },
        { date: '2023-09-04', requests: 52000 },
        { date: '2023-09-05', requests: 57000 },
      ],
      topEndpoints: [
        { endpoint: '/api/live-scores', requests: 25000 },
        { endpoint: '/api/player-stats', requests: 15000 },
        { endpoint: '/api/team-rankings', requests: 10000 },
      ],
      responseTimeDistribution: [
        { range: '0-100ms', percentage: 40 },
        { range: '100-200ms', percentage: 30 },
        { range: '200-300ms', percentage: 20 },
        { range: '300ms+', percentage: 10 },
      ]
    };
    setUsageData(mockData);
  };

  if (!usageData) return <div>Loading...</div>;

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Usage Analytics</h1>
      <Row>
        <Col md={8}>
          <Card>
            <CardBody>
              <h3>Daily API Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData.dailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="requests" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h3>Top Endpoints</h3>
              <ul>
                {usageData.topEndpoints.map((endpoint: any, index: any) => (
                  <li key={index}>{endpoint.endpoint}: {endpoint.requests} requests</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <CardBody>
              <h3>Response Time Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData.responseTimeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="percentage" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default UsageAnalytics;