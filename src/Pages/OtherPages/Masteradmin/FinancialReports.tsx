import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState<any>('revenue');
  const [startDate, setStartDate] = useState<any>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState<any>(new Date());
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    fetchReportData();
  }, [startDate, endDate]);

  const fetchReportData = async () => {
    // Replace with actual API call
    const mockData = {
      revenue: {
        total: 500000,
        byMonth: [
          { month: 'Jan', amount: 40000 },
          { month: 'Feb', amount: 45000 },
          { month: 'Mar', amount: 48000 },
          { month: 'Apr', amount: 52000 },
          { month: 'May', amount: 55000 },
        ],
        byPlan: [
          { plan: 'Basic', amount: 150000 },
          { plan: 'Pro', amount: 250000 },
          { plan: 'Enterprise', amount: 100000 },
        ],
      },
      expenses: {
        total: 300000,
        byCategory: [
          { category: 'Salaries', amount: 150000 },
          { category: 'Marketing', amount: 50000 },
          { category: 'Infrastructure', amount: 70000 },
          { category: 'Other', amount: 30000 },
        ],
      },
      profit: {
        total: 200000,
        margin: 40,
        trend: [
          { month: 'Jan', amount: 15000 },
          { month: 'Feb', amount: 18000 },
          { month: 'Mar', amount: 20000 },
          { month: 'Apr', amount: 22000 },
          { month: 'May', amount: 25000 },
        ],
      },
      cashFlow: {
        netCashFlow: 180000,
        inflow: 520000,
        outflow: 340000,
      },
    };
    setReportData(mockData);
  };

  const revenueChartData = {
    labels: reportData?.revenue.byMonth.map((item: any) => item.month) || [],
    datasets: [
      {
        label: 'Revenue',
        data: reportData?.revenue.byMonth.map((item: any) => item.amount) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const expensesChartData = {
    labels: reportData?.expenses.byCategory.map((item: any) => item.category) || [],
    datasets: [
      {
        label: 'Expenses',
        data: reportData?.expenses.byCategory.map((item: any) => item.amount) || [],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      }
    ]
  };

  const profitChartData = {
    labels: reportData?.profit.trend.map((item: any) => item.month) || [],
    datasets: [
      {
        label: 'Profit',
        data: reportData?.profit.trend.map((item: any) => item.amount) || [],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Financial Reports</h1>
      <Row className="mb-4">
        <Col md={6}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control me-2"
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
            className={activeTab === 'revenue' ? 'active' : ''}
            onClick={() => setActiveTab('revenue')}
          >
            Revenue
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'expenses' ? 'active' : ''}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'profit' ? 'active' : ''}
            onClick={() => setActiveTab('profit')}
          >
            Profit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'cashFlow' ? 'active' : ''}
            onClick={() => setActiveTab('cashFlow')}
          >
            Cash Flow
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="revenue">
          <Row className="mt-4">
            <Col md={8}>
              <Card>
                <CardBody>
                  <h3>Revenue Over Time</h3>
                  <Line data={revenueChartData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <h3>Revenue by Plan</h3>
                  <Pie 
                    data={{
                      labels: reportData?.revenue.byPlan.map((item: any) => item.plan) || [],
                      datasets: [{
                        data: reportData?.revenue.byPlan.map((item: any) => item.amount) || [],
                        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                      }]
                    }} 
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card className="mt-4">
            <CardBody>
              <h3>Revenue Summary</h3>
              <p><strong>Total Revenue:</strong> ${reportData?.revenue.total.toLocaleString()}</p>
              <Table striped>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData?.revenue.byPlan.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.plan}</td>
                      <td>${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="expenses">
          <Row className="mt-4">
            <Col md={8}>
              <Card>
                <CardBody>
                  <h3>Expenses by Category</h3>
                  <Bar 
                    data={expensesChartData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <h3>Expense Summary</h3>
                  <p><strong>Total Expenses:</strong> ${reportData?.expenses.total.toLocaleString()}</p>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData?.expenses.byCategory.map((item: any, index: any) => (
                        <tr key={index}>
                          <td>{item.category}</td>
                          <td>${item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="profit">
          <Row className="mt-4">
            <Col md={8}>
              <Card>
                <CardBody>
                  <h3>Profit Trend</h3>
                  <Line data={profitChartData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <h3>Profit Summary</h3>
                  <p><strong>Total Profit:</strong> ${reportData?.profit.total.toLocaleString()}</p>
                  <p><strong>Profit Margin:</strong> {reportData?.profit.margin}%</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="cashFlow">
          <Row className="mt-4">
            <Col md={12}>
              <Card>
                <CardBody>
                  <h3>Cash Flow Summary</h3>
                  <p><strong>Net Cash Flow:</strong> ${reportData?.cashFlow.netCashFlow.toLocaleString()}</p>
                  <p><strong>Total Inflow:</strong> ${reportData?.cashFlow.inflow.toLocaleString()}</p>
                  <p><strong>Total Outflow:</strong> ${reportData?.cashFlow.outflow.toLocaleString()}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <Button color="primary" className="mt-4">Export Report</Button>
    </Container>
    </div>
  );
};

export default FinancialReports;