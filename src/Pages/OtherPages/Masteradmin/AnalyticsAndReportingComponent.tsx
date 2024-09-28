import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Download, Filter } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AnalyticsAndReportingComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('overview');
  const [startDate, setStartDate] = useState<any>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState<any>(new Date());
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [customReportConfig, setCustomReportConfig] = useState<any>({
    metrics: [],
    dimensions: [],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [startDate, endDate]);

  const fetchAnalyticsData = async () => {
    // Replace with actual API call
    const mockData = {
      overview: {
        totalUsers: 10000,
        activeUsers: 8000,
        totalRevenue: 500000,
        apiCalls: 1000000,
      },
      userMetrics: {
        newUsers: [
          { date: '2023-01', count: 500 },
          { date: '2023-02', count: 600 },
          { date: '2023-03', count: 750 },
          { date: '2023-04', count: 900 },
          { date: '2023-05', count: 1000 },
        ],
        userRetention: 85,
        userEngagement: [
          { type: 'Daily', percentage: 60 },
          { type: 'Weekly', percentage: 80 },
          { type: 'Monthly', percentage: 95 },
        ],
      },
      apiUsage: {
        totalCalls: 1000000,
        callsByEndpoint: [
          { endpoint: '/matches', calls: 500000 },
          { endpoint: '/players', calls: 300000 },
          { endpoint: '/teams', calls: 200000 },
        ],
        responseTime: [
          { date: '2023-01', time: 100 },
          { date: '2023-02', time: 95 },
          { date: '2023-03', time: 105 },
          { date: '2023-04', time: 98 },
          { date: '2023-05', time: 92 },
        ],
      },
    };
    setAnalyticsData(mockData);
  };

  const handleCustomReportConfigChange = (e: any) => {
    const { name, checked, value } = e.target;
    if (name === 'metrics' || name === 'dimensions') {
      setCustomReportConfig((prev: any) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item: any) => item !== value)
      }));
    }
  };

  const generateCustomReport = () => {
    // Implement custom report generation logic
    console.log('Generating custom report with config:', customReportConfig);
    // This would typically involve an API call to generate the report based on the configuration
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Analytics & Reporting</h1>
      <Row className="mb-4">
        <Col md={6}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </Col>
        <Col md={6}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </Col>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Analytics Overview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'userMetrics' ? 'active' : ''}
            onClick={() => setActiveTab('userMetrics')}
          >
            User Metrics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'apiUsage' ? 'active' : ''}
            onClick={() => setActiveTab('apiUsage')}
          >
            API Usage Metrics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'customReports' ? 'active' : ''}
            onClick={() => setActiveTab('customReports')}
          >
            Custom Reports
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="overview">
          <Row className="mt-4">
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Total Users</h5>
                  <h2>{analyticsData?.overview.totalUsers.toLocaleString()}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Active Users</h5>
                  <h2>{analyticsData?.overview.activeUsers.toLocaleString()}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Total Revenue</h5>
                  <h2>${analyticsData?.overview.totalRevenue.toLocaleString()}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>API Calls</h5>
                  <h2>{analyticsData?.overview.apiCalls.toLocaleString()}</h2>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="userMetrics">
          <Row className="mt-4">
            <Col md={8}>
              <Card>
                <CardBody>
                  <h3>New Users Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData?.userMetrics.newUsers}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <h3>User Retention</h3>
                  <h2>{analyticsData?.userMetrics.userRetention}%</h2>
                  <p>of users retained</p>
                </CardBody>
              </Card>
              <Card className="mt-3">
                <CardBody>
                  <h3>User Engagement</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={analyticsData?.userMetrics.userEngagement}
                        dataKey="percentage"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="apiUsage">
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <CardBody>
                  <h3>API Calls by Endpoint</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData?.apiUsage.callsByEndpoint}>
                      <XAxis dataKey="endpoint" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calls" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h3>API Response Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData?.apiUsage.responseTime}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="time" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card className="mt-4">
            <CardBody>
              <h3>Total API Calls</h3>
              <h2>{analyticsData?.apiUsage.totalCalls.toLocaleString()}</h2>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="customReports">
          <Card className="mt-4">
            <CardBody>
              <h3>Custom Report Configuration</h3>
              <Form>
                <FormGroup>
                  <Label>Metrics</Label>
                  <div>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="metrics" value="users" onChange={handleCustomReportConfigChange} /> Users
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="metrics" value="revenue" onChange={handleCustomReportConfigChange} /> Revenue
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="metrics" value="apiCalls" onChange={handleCustomReportConfigChange} /> API Calls
                      </Label>
                    </FormGroup>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Dimensions</Label>
                  <div>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="dimensions" value="date" onChange={handleCustomReportConfigChange} /> Date
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="dimensions" value="country" onChange={handleCustomReportConfigChange} /> Country
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" name="dimensions" value="plan" onChange={handleCustomReportConfigChange} /> Plan
                      </Label>
                    </FormGroup>
                  </div>
                </FormGroup>
                <Button color="primary" onClick={generateCustomReport}>Generate Report</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </Container>
    </div>
  );
};

export default AnalyticsAndReportingComponent;