import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Table, Nav, NavItem, NavLink, TabContent, TabPane, Badge } from 'reactstrap';
import { TrendingUp, Activity, AlertTriangle, Clock, Globe, Smartphone, MapPin } from 'lucide-react';
import { AppDispatch, RootState } from '../../ReduxToolkit/Store';
import { getAnalyticsData } from '../../ReduxToolkit/Reducers/Change/AnalyticsSlice';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsCard = ({ title, value, icon: Icon }: any) => (
  <Card className="mb-3 shadow-sm">
    <CardBody className="d-flex justify-content-between align-items-center">
      <div>
        <h6 className="mb-0 text-muted">{title}</h6>
        <h3 className="mb-0">{value}</h3>
      </div>
      <div className="bg-primary rounded-circle p-3">
        <Icon size={24} color="white" />
      </div>
    </CardBody>
  </Card>
);

const EnhancedAnalytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const analyticsData = useSelector((state: RootState) => state.analytics.analytics);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    dispatch(getAnalyticsData());
  }, [dispatch]);

  const analyticsCardData = analyticsData?.data?.map((item: any) => ({
    title: item.name,
    value: item.count,
    icon: TrendingUp // You can assign different icons based on the item name
  })) || [];

  // Mock data for charts - replace with actual data from your API
  const apiUsageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'API Calls',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const apiResponseTimeData = {
    labels: ['< 100ms', '100-500ms', '500ms-1s', '> 1s'],
    datasets: [
      {
        label: 'Response Time',
        data: [300, 50, 100, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const apiErrorData = {
    labels: ['400', '401', '403', '404', '500'],
    datasets: [
      {
        label: 'Error Count',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return (
    <div className='page-body'>
      <Container fluid className="p-4 bg-light">
        {/* <h1 className="mb-4">Analytics Dashboard</h1> */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => setActiveTab('1')}
            >
              API Usage
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => setActiveTab('2')}
            >
              Performance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => setActiveTab('3')}
            >
              Error Analysis
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row className="mt-3">
              <Col md={8}>
                <Card>
                  <CardBody>
                    <h4>API Usage Over Time</h4>
                    <Line data={apiUsageData} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <h4>Recent API Calls</h4>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Endpoint</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>/api/matches</td>
                          <td>2 min ago</td>
                          <td><Badge color="success">200</Badge></td>
                        </tr>
                        <tr>
                          <td>/api/players</td>
                          <td>5 min ago</td>
                          <td><Badge color="success">200</Badge></td>
                        </tr>
                        <tr>
                          <td>/api/teams</td>
                          <td>10 min ago</td>
                          <td><Badge color="danger">404</Badge></td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row className="mt-3">
              <Col md={6}>
                <Card>
                  <CardBody>
                    <h4>API Response Time Distribution</h4>
                    <Pie data={apiResponseTimeData} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <CardBody>
                    <h4>Top Performing Endpoints</h4>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Endpoint</th>
                          <th>Avg. Response Time</th>
                          <th>Calls/min</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>/api/matches</td>
                          <td>50ms</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>/api/players</td>
                          <td>75ms</td>
                          <td>80</td>
                        </tr>
                        <tr>
                          <td>/api/teams</td>
                          <td>60ms</td>
                          <td>60</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row className="mt-3">
              <Col md={8}>
                <Card>
                  <CardBody>
                    <h4>API Errors by Type</h4>
                    <Bar data={apiErrorData} />
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <h4>Recent Errors</h4>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Error</th>
                          <th>Endpoint</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><Badge color="danger">404</Badge></td>
                          <td>/api/unknown</td>
                          <td>2 min ago</td>
                        </tr>
                        <tr>
                          <td><Badge color="warning">401</Badge></td>
                          <td>/api/secure</td>
                          <td>5 min ago</td>
                        </tr>
                        <tr>
                          <td><Badge color="danger">500</Badge></td>
                          <td>/api/process</td>
                          <td>10 min ago</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>

        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <CardBody>
                <h4>API Usage Details</h4>
                <p><Clock size={18} className="me-2" /> Last API Call: 2023-09-26 14:30:45 UTC</p>
                <p><Globe size={18} className="me-2" /> Domain: api.example.com</p>
                <p><Smartphone size={18} className="me-2" /> Last Device: iPhone 12</p>
                <p><MapPin size={18} className="me-2" /> Last Location: New York, USA</p>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody>
                <h4>API Health</h4>
                <p><Activity size={18} className="me-2" /> Current Status: Operational</p>
                <p><AlertTriangle size={18} className="me-2" /> Active Alerts: None</p>
                <p>Uptime: 99.99% (last 30 days)</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {analyticsCardData.map((item: any, index: any) => (
            <Col key={index} md={3} className="mb-3">
              <AnalyticsCard title={item.title} value={item.value} icon={item.icon} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default EnhancedAnalytics;