import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Badge } from 'reactstrap';

import { Line } from 'react-chartjs-2';
import { Copy, RefreshCw, DollarSign, Users, TrendingUp, Share2 } from 'lucide-react';

const ReferralProgramComponent = () => {
  const [referralStats, setReferralStats] = useState<any>({
    earning: 0,
    references: 0,
    referralCode: 'cbc6de',
  });
  const [topReferrers, setTopReferrers] = useState<any>([]);
  const [earningHistory, setEarningHistory] = useState<any>([]);
  const [referralModalOpen, setReferralModalOpen] = useState<any>(false);
  const [copiedAlert, setCopiedAlert] = useState<any>(false);

  useEffect(() => {
    fetchReferralData();
    const interval = setInterval(fetchReferralData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchReferralData = async () => {
    // Simulated API call
    const mockStats = {
      earning: Math.floor(Math.random() * 1000),
      references: Math.floor(Math.random() * 50),
      referralCode: 'cbc6de',
    };
    setReferralStats(mockStats);

    const mockTopReferrers: any = [
      { id: 'PSA001', referred: 'shah@hello@gmail.com', commissionEarned: 50, commissionPercentage: 5, registeredAt: '05/08/2024' },
      { id: 'PSA002', referred: 'pawan@batreemedia.in', commissionEarned: 30, commissionPercentage: 5, registeredAt: '05/08/2024' },
      // Add more mock data
    ];
    setTopReferrers(mockTopReferrers);

    const mockEarningHistory = [
      { date: '2024-01', amount: 100 },
      { date: '2024-02', amount: 150 },
      { date: '2024-03', amount: 200 },
      { date: '2024-04', amount: 180 },
      { date: '2024-05', amount: 250 },
    ];
    setEarningHistory(mockEarningHistory);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralStats.referralCode);
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2000);
  };

  const generateReferralLink = () => {
    return `https://prosportsapi.com/signup?ref=${referralStats.referralCode}`;
  };

  const earningChartData = {
    labels: earningHistory.map((item: any) => item.date),
    datasets: [
      {
        label: 'Earnings',
        data: earningHistory.map((item: any) => item.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Referral Program</h1>
      <p>Track and find all the details about our referral program, your stats and revenues.</p>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <CardBody>
              <h5><DollarSign size={20} className="me-2" />Earning</h5>
              <h2>${referralStats.earning}</h2>
              <Button color="primary" size="sm" onClick={() => setReferralModalOpen(true)}>View Details</Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h5><Users size={20} className="me-2" />References</h5>
              <h2>{referralStats.references}</h2>
              <Button color="info" size="sm" onClick={fetchReferralData}><RefreshCw size={16} /></Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h5><Share2 size={20} className="me-2" />Referral Code</h5>
              <h2>{referralStats.referralCode}</h2>
              <Button color="success" size="sm" onClick={copyReferralCode}>Copy Code</Button>
              {copiedAlert && <Alert color="success" className="mt-2">Copied!</Alert>}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <CardBody>
          <h3>Earnings Over Time</h3>
          <Line data={earningChartData} />
        </CardBody>
      </Card>

      <h2 className="mb-3">Top Referred Users</h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Referred</th>
            <th>Commission Earned ($)</th>
            <th>Commission (%)</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {topReferrers.map((referrer: any, index: any) => (
            <tr key={index}>
              <td>{referrer.id}</td>
              <td>{referrer.referred}</td>
              <td>{referrer.commissionEarned}</td>
              <td>{referrer.commissionPercentage}%</td>
              <td>{referrer.registeredAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={referralModalOpen} toggle={() => setReferralModalOpen(!referralModalOpen)}>
        <ModalHeader toggle={() => setReferralModalOpen(!referralModalOpen)}>
          Referral Details
        </ModalHeader>
        <ModalBody>
          <h4>Your Referral Link</h4>
          <Input value={generateReferralLink()} readOnly />
          <Button color="primary" className="mt-2" onClick={() => navigator.clipboard.writeText(generateReferralLink())}>
            Copy Link
          </Button>
          <h4 className="mt-4">How It Works</h4>
          <ol>
            <li>Share your unique referral link with friends or colleagues</li>
            <li>When they sign up using your link, they get a 10% discount on their first month</li>
            <li>You earn a 5% commission on their subscription for the first year</li>
          </ol>
          <Alert color="info">
            The more people you refer, the more you can earn!
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setReferralModalOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default ReferralProgramComponent;