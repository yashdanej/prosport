import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, Table, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { H2, H3, P, Image } from '../../../AbstractElements';
import { dynamicImage } from '../../../Service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../ReduxToolkit/Store';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Users, DollarSign, AlertTriangle, Activity, Database, Settings } from 'lucide-react';

const MasterDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);
  const [activeTab, setActiveTab] = useState<any>('1');
  const [topCards, setTopCards] = useState<any>([]);

  useEffect(() => {
    // dispatch(fetchMasterDashboardData());
  }, [dispatch]);

  useEffect(() => {
    // if (dashData?.data?.response) {
      setTopCards([
        {
          value: 10,
          title: "New Registration",
          color: "success",
          icon: <Users size={24} />,
          percentage: "+27.02%",
          detail: "than last 4 Month",
          image: "teacher.png",
        },
        {
          value: 10,
          title: "New Subscription",
          color: "primary",
          icon: <DollarSign size={24} />,
          percentage: "+20.15%",
          detail: "than last month",
          image: "subscription.png",
        },
        {
          value: 10,
          title: "Expired Subscription",
          color: "danger",
          icon: <AlertTriangle size={24} />,
          percentage: "-5.23%",
          detail: "than expected",
          image: "expired.png",
        },
        {
          value: 1000000,
          title: "Total API Calls",
          color: "info",
          icon: <Activity size={24} />,
          percentage: "+15.75%",
          detail: "than last week",
          image: "api.png",
        },
      ]);
    // }
  }, [dashData]);

  // Mock data for charts - replace with actual data from your API
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Users',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000, 2000, 3000],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    }]
  };

  const subscriptionDistribution = {
    labels: ['Basic', 'Pro', 'Enterprise'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <H2 className="mb-4">Master Admin Dashboard</H2>
      
      <Row>
        {topCards?.map((data: any, i: number) => (
          <Col xl="3" sm="6" key={i}>
            <Card>
              <CardBody className={`bg-light-${data.color}`}>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <P className="mb-0 text-muted">{data.title}</P>
                    <H3 className={`text-${data.color}`}>{data.value.toLocaleString()}</H3>
                    <P className="mb-0 mt-2">
                      <span className={`text-${data.color} fw-bold`}>{data.percentage}</span>
                      <span className="text-muted ms-2">{data.detail}</span>
                    </P>
                  </div>
                  <div className="flex-shrink-0">
                    {data.icon}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Nav tabs className="mt-4">
        <NavItem>
          <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
            User Analytics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
            Revenue & Subscriptions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
            System Health
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className="mt-3">
        <TabPane tabId="1">
          <Row>
            <Col md={8}>
              <Card>
                <CardBody>
                  <H3>User Growth</H3>
                  <Line data={userGrowthData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <H3>Recent Registrations</H3>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>2023-09-28</td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>2023-09-27</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col md={8}>
              <Card>
                <CardBody>
                  <H3>Revenue Overview</H3>
                  <Bar data={revenueData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <H3>Subscription Distribution</H3>
                  <Pie data={subscriptionDistribution} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <H3>System Status</H3>
                  <P><Database size={18} className="me-2" /> Database: Operational</P>
                  <P><Activity size={18} className="me-2" /> API: Operational</P>
                  <P><Settings size={18} className="me-2" /> Background Jobs: Running</P>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <H3>Recent Alerts</H3>
                  <ul>
                    <li>High CPU usage detected (2023-09-28 14:30)</li>
                    <li>Database backup completed (2023-09-28 02:00)</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <CardBody>
              <H3>Quick Actions</H3>
              <Button color="primary" className="me-2">Generate Monthly Report</Button>
              <Button color="secondary" className="me-2">Manage User Roles</Button>
              <Button color="info" className="me-2">Update API Settings</Button>
              <Button color="warning">Send System Notification</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default MasterDashboard;