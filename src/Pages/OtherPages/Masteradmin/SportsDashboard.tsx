import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Table, Progress, Badge } from 'reactstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SportsDashboard = () => {
  const [activeTab, setActiveTab] = useState<any>('overview');
  const [sportsData, setSportsData] = useState<any>([]);
  const [overallHealth, setOverallHealth] = useState<any>({});

  useEffect(() => {
    // Fetch sports data from your API
    fetchSportsData();
    fetchOverallHealth();
  }, []);

  const fetchSportsData = () => {
    // Replace with actual API call
    const mockSportsData = [
      {
        name: 'Cricket',
        databaseSize: '500 GB',
        successRate: 98.5,
        failureRate: 1.5,
        apis: [
          { name: 'Live Scores', url: '/api/cricket/live-scores', status: 'Operational', lastCheck: '2023-09-28 15:30:00', responseTime: 120 },
          { name: 'Player Stats', url: '/api/cricket/player-stats', status: 'Degraded', lastCheck: '2023-09-28 15:25:00', responseTime: 350 },
        ]
      },
      {
        name: 'Football',
        databaseSize: '750 GB',
        successRate: 99.2,
        failureRate: 0.8,
        apis: [
          { name: 'Match Results', url: '/api/football/results', status: 'Operational', lastCheck: '2023-09-28 15:28:00', responseTime: 95 },
          { name: 'Team Rankings', url: '/api/football/rankings', status: 'Operational', lastCheck: '2023-09-28 15:27:00', responseTime: 110 },
        ]
      },
      // Add more sports as needed
    ];
    setSportsData(mockSportsData);
  };

  const fetchOverallHealth = () => {
    // Replace with actual API call
    const mockOverallHealth = {
      overallSuccessRate: 98.9,
      overallFailureRate: 1.1,
      totalApis: 20,
      operationalApis: 18,
      degradedApis: 1,
      downApis: 1,
      averageResponseTime: 130
    };
    setOverallHealth(mockOverallHealth);
  };

  const renderStatusBadge = (status: any) => {
    switch (status) {
      case 'Operational':
        return <Badge color="success">Operational</Badge>;
      case 'Degraded':
        return <Badge color="warning">Degraded</Badge>;
      case 'Down':
        return <Badge color="danger">Down</Badge>;
      default:
        return <Badge color="secondary">Refresh</Badge>;
    }
  };

  const renderOverallHealthChart = () => {
    const data = {
      labels: ['Operational', 'Degraded', 'Down'],
      datasets: [
        {
          data: [overallHealth.operationalApis, overallHealth.degradedApis, overallHealth.downApis],
          backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        },
      ],
    };

    return <Pie data={data} />;
  };

  const renderResponseTimeChart = () => {
    // This would ideally be actual data over time
    const data = {
      labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
      datasets: [
        {
          label: 'Average Response Time (ms)',
          data: [140, 135, 130, 128, overallHealth.averageResponseTime],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
      ],
    };

    return <Line data={data} />;
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Sports Data Management</h1>

      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <CardBody>
              <h4>Overall Success Rate</h4>
              <h2 className="text-success">{overallHealth.overallSuccessRate}%</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <h4>Overall Failure Rate</h4>
              <h2 className="text-danger">{overallHealth.overallFailureRate}%</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <h4>Total APIs</h4>
              <h2>{overallHealth.totalApis}</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <h4>Avg Response Time</h4>
              <h2>{overallHealth.averageResponseTime} ms</h2>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </NavLink>
        </NavItem>
        {sportsData.map((sport: any, index: any) => (
          <NavItem key={index}>
            <NavLink
              className={activeTab === sport.name ? 'active' : ''}
              onClick={() => setActiveTab(sport.name)}
            >
              {sport.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="overview">
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <CardBody>
                  <h3>API Health Distribution</h3>
                  {renderOverallHealthChart()}
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h3>Average Response Time Trend</h3>
                  {renderResponseTimeChart()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        {sportsData.map((sport: any, index: any) => (
          <TabPane tabId={sport.name} key={index}>
            <Card className="mt-4">
              <CardBody>
                <h3>{sport.name} APIs</h3>
                <p>Database Size: {sport.databaseSize}</p>
                <p>Success Rate: {sport.successRate}%</p>
                <p>Failure Rate: {sport.failureRate}%</p>
                <Table striped>
                  <thead>
                    <tr>
                      <th>API Name</th>
                      <th>URL</th>
                      <th>Status</th>
                      <th>Last Check</th>
                      <th>Response Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sport.apis.map((api: any, apiIndex: any) => (
                      <tr key={apiIndex}>
                        <td>{api.name}</td>
                        <td>{api.url}</td>
                        <td>{renderStatusBadge(api.status)}</td>
                        <td>{api.lastCheck}</td>
                        <td>{api.responseTime} ms</td>
                        <td style={{cursor: 'pointer'}}>{renderStatusBadge("Refresh")}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPane>
        ))}
      </TabContent>
    </Container>
    </div>
  );
};

export default SportsDashboard;