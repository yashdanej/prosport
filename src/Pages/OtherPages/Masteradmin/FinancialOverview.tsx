import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const FinancialOverview = () => {
  const [financialData, setFinancialData] = useState<any>(null);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    // Replace with actual API call
    const mockData = {
      totalRevenue: 500000,
      monthlyRecurringRevenue: 50000,
      averageRevenuePerUser: 100,
      churnRate: 2.5,
      revenueByMonth: [
        { month: 'Jan', revenue: 40000 },
        { month: 'Feb', revenue: 42000 },
        { month: 'Mar', revenue: 45000 },
        { month: 'Apr', revenue: 48000 },
        { month: 'May', revenue: 50000 },
      ],
      revenueByPlan: [
        { plan: 'Basic', revenue: 100000 },
        { plan: 'Pro', revenue: 250000 },
        { plan: 'Enterprise', revenue: 150000 },
      ]
    };
    setFinancialData(mockData);
  };

  const revenueChartData = {
    labels: financialData?.revenueByMonth.map((item: any) => item.month) || [],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: financialData?.revenueByMonth.map((item: any) => item.revenue) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const planChartData = {
    labels: financialData?.revenueByPlan.map((item: any) => item.plan) || [],
    datasets: [
      {
        label: 'Revenue by Plan',
        data: financialData?.revenueByPlan.map((item: any) => item.revenue) || [],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
      }
    ]
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Financial Overview</h1>
      {financialData && (
        <>
          <Row>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Total Revenue</h5>
                  <h3>${financialData.totalRevenue.toLocaleString()}</h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Monthly Recurring Revenue</h5>
                  <h3>${financialData.monthlyRecurringRevenue.toLocaleString()}</h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Avg. Revenue Per User</h5>
                  <h3>${financialData.averageRevenuePerUser.toLocaleString()}</h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <CardBody>
                  <h5>Churn Rate</h5>
                  <h3>{financialData.churnRate}%</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <Card>
                <CardBody>
                  <h5>Revenue Trend</h5>
                  <Line data={revenueChartData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <h5>Revenue by Plan</h5>
                  <Bar data={planChartData} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
    </div>
  );
};

export default FinancialOverview;