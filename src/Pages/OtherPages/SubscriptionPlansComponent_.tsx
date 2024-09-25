import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardHeader, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';
import { Check, X, Info, ArrowRight } from 'lucide-react';

const PlanCard = ({ plan, onSelect, onViewDetails }: any) => (
  <Card className="mb-4 h-100">
    <CardHeader>
      <h3>{plan.name}</h3>
      <h4>${plan.price}/month</h4>
    </CardHeader>
    <CardBody>
      <ul className="list-unstyled">
        {plan.features.map((feature: any, index: any) => (
          <li key={index} className="mb-2">
            {feature.included ? <Check className="text-success" /> : <X className="text-danger" />}
            {' '}{feature.name}
          </li>
        ))}
      </ul>
      <Button color="primary" onClick={() => onSelect(plan)} className="mt-3 w-100">Select Plan</Button>
      <Button color="link" onClick={() => onViewDetails(plan)} className="mt-2 w-100">View Details</Button>
    </CardBody>
  </Card>
);

const SubscriptionPlansComponent_ = () => {
  const [activeTab, setActiveTab] = useState<any>('all');
  const [plans, setPlans] = useState<any>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState<any>(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    // Simulated API call
    const mockPlans = [
      {
        id: 1,
        game: 'Cricket',
        name: 'Basic',
        price: 29.99,
        features: [
          { name: 'Live Scores', included: true },
          { name: 'Match Statistics', included: true },
          { name: 'Player Profiles', included: true },
          { name: 'Historical Data', included: false },
          { name: 'API Access', included: false },
        ],
        apiCallLimit: 1000,
        dataUpdateFrequency: '5 minutes',
        supportLevel: 'Email',
      },
      {
        id: 2,
        game: 'Cricket',
        name: 'Pro',
        price: 99.99,
        features: [
          { name: 'Live Scores', included: true },
          { name: 'Match Statistics', included: true },
          { name: 'Player Profiles', included: true },
          { name: 'Historical Data', included: true },
          { name: 'API Access', included: true },
        ],
        apiCallLimit: 10000,
        dataUpdateFrequency: '1 minute',
        supportLevel: '24/7 Phone & Email',
      },
      {
        id: 3,
        game: 'Football',
        name: 'Basic',
        price: 39.99,
        features: [
          { name: 'Live Scores', included: true },
          { name: 'Match Statistics', included: true },
          { name: 'Player Profiles', included: true },
          { name: 'Historical Data', included: false },
          { name: 'API Access', included: false },
        ],
        apiCallLimit: 1500,
        dataUpdateFrequency: '5 minutes',
        supportLevel: 'Email',
      },
      // Add more plans for different games
    ];
    setPlans(mockPlans);
  };

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleViewDetails = (plan: any) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const confirmPlanSelection = () => {
    // Implement plan selection logic here
    console.log('Selected plan:', selectedPlan);
    setModalOpen(false);
    // You might want to redirect to a checkout page or show a confirmation message
  };

  // const uniqueGames = ['All', ...new Set(plans.map(plan => plan.game))];
  const uniqueGames: any = ['All', ...Array.from(new Set(plans.map((plan: { game: string }) => plan.game)))];

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Subscription Plans</h1>

      <Nav tabs className="mb-4">
        {uniqueGames.map((game: any) => (
          <NavItem key={game}>
            <NavLink
              className={activeTab === (game.toLowerCase() === 'all' ? 'all' : game) ? 'active' : ''}
              onClick={() => setActiveTab(game.toLowerCase() === 'all' ? 'all' : game)}
            >
              {game}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Button color="info" className="mb-4" onClick={() => setComparisonModalOpen(true)}>
        Compare All Plans
      </Button>

      <TabContent activeTab={activeTab}>
        {uniqueGames.map((game: any) => (
          <TabPane key={game} tabId={game.toLowerCase() === 'all' ? 'all' : game}>
            <Row>
              {plans
                .filter((plan: any) => activeTab === 'all' || plan.game === game)
                .map((plan: any) => (
                  <Col key={plan.id} md={4}>
                    <PlanCard 
                      plan={plan} 
                      onSelect={handleSelectPlan} 
                      onViewDetails={handleViewDetails}
                    />
                  </Col>
                ))
              }
            </Row>
          </TabPane>
        ))}
      </TabContent>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          {selectedPlan?.name} Plan Details
        </ModalHeader>
        <ModalBody>
          {selectedPlan && (
            <>
              <h3>{selectedPlan.game} - {selectedPlan.name} Plan</h3>
              <p><strong>Price:</strong> ${selectedPlan.price}/month</p>
              <h4>Features:</h4>
              <ul>
                {selectedPlan?.features?.map((feature: any, index: any) => (
                  <li key={index}>
                    {feature.included ? <Check className="text-success" /> : <X className="text-danger" />}
                    {' '}{feature.name}
                  </li>
                ))}
              </ul>
              <p><strong>API Call Limit:</strong> {selectedPlan.apiCallLimit} calls/day</p>
              <p><strong>Data Update Frequency:</strong> {selectedPlan.dataUpdateFrequency}</p>
              <p><strong>Support Level:</strong> {selectedPlan.supportLevel}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmPlanSelection}>Confirm Selection</Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={comparisonModalOpen} toggle={() => setComparisonModalOpen(!comparisonModalOpen)} size="xl">
        <ModalHeader toggle={() => setComparisonModalOpen(!comparisonModalOpen)}>
          Plan Comparison
        </ModalHeader>
        <ModalBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Feature</th>
                {plans.map((plan: any) => (
                  <th key={plan.id}>{plan.game} - {plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Price (Monthly)</th>
                {plans.map((plan: any) => (
                  <td key={plan.id}>${plan.price}</td>
                ))}
              </tr>
              {plans[0]?.features.map((feature: any, index: any) => (
                <tr key={index}>
                  <th>{feature.name}</th>
                  {plans.map((plan: any) => (
                    <td key={plan.id}>
                      {plan.features[index].included ? <Check className="text-success" /> : <X className="text-danger" />}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th>API Call Limit</th>
                {plans.map((plan: any) => (
                  <td key={plan.id}>{plan.apiCallLimit} calls/day</td>
                ))}
              </tr>
              <tr>
                <th>Data Update Frequency</th>
                {plans.map((plan: any) => (
                  <td key={plan.id}>{plan.dataUpdateFrequency}</td>
                ))}
              </tr>
              <tr>
                <th>Support Level</th>
                {plans.map((plan: any) => (
                  <td key={plan.id}>{plan.supportLevel}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </Container>
    </div>
  );
};

export default SubscriptionPlansComponent_;