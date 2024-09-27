import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const APIOverview = () => {
  const [overviewData, setOverviewData] = useState<any>(null);

  useEffect(() => {
    // Fetch API overview data
    fetchAPIOverviewData();
  }, []);

  const fetchAPIOverviewData = async () => {
    // Replace with actual API call
    const mockData = {
      totalAPIs: 15,
      activeAPIs: 12,
      deprecatedAPIs: 3,
      totalRequests: 1000000,
      averageResponseTime: 250, // ms
      errorRate: 0.5, // percentage
      topAPIs: [
        { name: 'Live Scores', requests: 500000 },
        { name: 'Player Stats', requests: 300000 },
        { name: 'Team Rankings', requests: 200000 },
      ]
    };
    setOverviewData(mockData);
  };

  if (!overviewData) return <div>Loading...</div>;

  return (
    <div className='page-body'>
    <Container fluid>
      <h1 className="mb-4">API Overview</h1>
      <Row>
        <Col md={4}>
          <Card>
            <CardBody>
              <h3>Total APIs</h3>
              <p className="h1">{overviewData.totalAPIs}</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h3>Active APIs</h3>
              <p className="h1">{overviewData.activeAPIs}</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h3>Deprecated APIs</h3>
              <p className="h1">{overviewData.deprecatedAPIs}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <CardBody>
              <h3>API Usage Statistics</h3>
              <p>Total Requests: {overviewData.totalRequests.toLocaleString()}</p>
              <p>Average Response Time: {overviewData.averageResponseTime} ms</p>
              <p>Error Rate: {overviewData.errorRate}%</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardBody>
              <h3>Top APIs by Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overviewData.topAPIs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="requests" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default APIOverview;