import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardHeader, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Badge, Input, FormGroup, Label, Alert, Collapse, Spinner } from 'reactstrap';
import { Check, X, Info, ArrowRight, Search, Star, ChevronDown, ChevronUp, DollarSign, Clock, PhoneCall } from 'lucide-react';

interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  id: number;
  game: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: Feature[];
  apiCallLimit: number;
  dataUpdateFrequency: string;
  supportLevel: string;
  trialDays: number;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

const PlanCard: React.FC<{ plan: Plan; onSelect: (plan: Plan) => void; onViewDetails: (plan: Plan) => void; recommended: boolean }> = ({ plan, onSelect, onViewDetails, recommended }) => (
  <Card className={`mb-4 h-100 ${recommended ? 'border-primary' : ''}`}>
    {recommended && <Badge color="primary" className="position-absolute top-0 start-50 translate-middle">Recommended</Badge>}
    <CardHeader>
      <h3>{plan.name}</h3>
      <h4>${plan.monthlyPrice}/month</h4>
      {plan.annualPrice && <small className="text-muted">or ${plan.annualPrice}/year (save {Math.round((1 - plan.annualPrice / (plan.monthlyPrice * 12)) * 100)}%)</small>}
    </CardHeader>
    <CardBody>
      <ul className="list-unstyled">
        {plan.features.slice(0, 5).map((feature, index) => (
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

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <Card className="mb-3">
    <CardBody>
      <div className="d-flex justify-content-between">
        <h5>{review.user}</h5>
        <div>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < review.rating ? "gold" : "none"} stroke="gold" />
          ))}
        </div>
      </div>
      <p>{review.comment}</p>
    </CardBody>
  </Card>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <Button color="link" onClick={() => setIsOpen(!isOpen)} className="text-left w-100 d-flex justify-content-between align-items-center">
        {question}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>{answer}</CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

const SubscriptionPlansComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqModalOpen, setFaqModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPlans(), fetchReviews()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchPlans = async () => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockPlans: Plan[] = [
      {
        id: 1,
        game: 'Cricket',
        name: 'Basic',
        monthlyPrice: 29.99,
        annualPrice: 299.99,
        features: [
          { name: 'Live Scores', included: true },
          { name: 'Match Statistics', included: true },
          { name: 'Player Profiles', included: true },
          { name: 'Historical Data', included: false },
          { name: 'API Access', included: false },
          { name: 'Advanced Analytics', included: false },
        ],
        apiCallLimit: 1000,
        dataUpdateFrequency: '5 minutes',
        supportLevel: 'Email',
        trialDays: 7,
      },
      {
        id: 2,
        game: 'Cricket',
        name: 'Pro',
        monthlyPrice: 99.99,
        annualPrice: 999.99,
        features: [
          { name: 'Live Scores', included: true },
          { name: 'Match Statistics', included: true },
          { name: 'Player Profiles', included: true },
          { name: 'Historical Data', included: true },
          { name: 'API Access', included: true },
          { name: 'Advanced Analytics', included: true },
        ],
        apiCallLimit: 10000,
        dataUpdateFrequency: '1 minute',
        supportLevel: '24/7 Phone & Email',
        trialDays: 14,
      },
      // Add more plans...
    ];
    setPlans(mockPlans);
  };

  const fetchReviews = async () => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockReviews: Review[] = [
      { id: 1, user: 'John D.', rating: 5, comment: 'Excellent service, great data accuracy!' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Very useful for my fantasy league. Could use more historical data.' },
      // Add more reviews...
    ];
    setReviews(mockReviews);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleViewDetails = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const confirmPlanSelection = () => {
    // Implement plan selection logic here
    console.log('Selected plan:', selectedPlan);
    setModalOpen(false);
    // You might want to redirect to a checkout page or show a confirmation message
  };

  const uniqueGames = useMemo(() => ['All', ...Array.from(new Set(plans.map(plan => plan.game)))], [plans]);

  const filteredPlans = useMemo(() => 
    plans.filter(plan =>
      (activeTab === 'all' || plan.game === activeTab) &&
      (plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       plan.features.some(feature => feature.name.toLowerCase().includes(searchTerm.toLowerCase())))
    ),
    [plans, activeTab, searchTerm]
  );

  const getRecommendedPlan = (game: string) => {
    const gamePlans = plans.filter(plan => plan.game === game);
    return gamePlans.length > 1 ? gamePlans[1] : gamePlans[0]; // Assume the second plan is "recommended" if available
  };

  const faqItems = [
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
    { question: 'Can I cancel my subscription at any time?', answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of the current billing period.' },
    { question: 'How often is the data updated?', answer: 'Data update frequency depends on your plan. Basic plans are updated every 5 minutes, while Pro plans receive updates every minute.' },
    // Add more FAQ items...
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        <h1 className="mb-4">Subscription Plans</h1>

        <Row className="mb-4">
          <Col md={6}>
            <Input
              type="text"
              placeholder="Search plans or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="billingCycle">Billing Cycle</Label>
              <Input type="select" name="billingCycle" id="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'annual')}>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Nav tabs className="mb-4">
          {uniqueGames.map(game => (
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

        <Button color="info" className="mb-4 me-2" onClick={() => setComparisonModalOpen(true)}>
          Compare All Plans
        </Button>
        <Button color="secondary" className="mb-4" onClick={() => setFaqModalOpen(true)}>
          FAQ
        </Button>

        <TabContent activeTab={activeTab}>
          {uniqueGames.map(game => (
            <TabPane key={game} tabId={game.toLowerCase() === 'all' ? 'all' : game}>
              <Row>
                {filteredPlans
                  .filter(plan => activeTab === 'all' || plan.game === game)
                  .map(plan => (
                    <Col key={plan.id} md={4}>
                      <PlanCard 
                        plan={plan} 
                        onSelect={handleSelectPlan} 
                        onViewDetails={handleViewDetails}
                        recommended={plan.id === getRecommendedPlan(game)?.id}
                      />
                    </Col>
                  ))
                }
              </Row>
            </TabPane>
          ))}
        </TabContent>

        <h2 className="mt-5 mb-4">User Reviews</h2>
        <Row>
          {reviews.map(review => (
            <Col key={review.id} md={6}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg">
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
            {selectedPlan?.name} Plan Details
          </ModalHeader>
          <ModalBody>
            {selectedPlan && (
              <>
                <h3>{selectedPlan.game} - {selectedPlan.name} Plan</h3>
                <p><strong>Price:</strong> ${billingCycle === 'monthly' ? selectedPlan.monthlyPrice + '/month' : selectedPlan.annualPrice + '/year'}</p>
                <Alert color="info">
                  Try it free for {selectedPlan.trialDays} days! No credit card required.
                </Alert>
                <h4>Features:</h4>
                <ul>
                  {selectedPlan.features.map((feature, index) => (
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
            <Button color="primary" onClick={confirmPlanSelection}>Start Free Trial</Button>
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
                {plans?.map((plan: any) => (
                  <th key={plan.id}>{plan.game} - {plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Price ({billingCycle === 'monthly' ? 'Monthly' : 'Annual'})</th>
                {plans?.map((plan: any) => (
                  <td key={plan.id}>${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}</td>
                ))}
              </tr>
              {plans[0]?.features?.map((feature: any, index: any) => (
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
              <tr>
                <th>Free Trial</th>
                {plans.map((plan: any) => (
                  <td key={plan.id}>{plan.trialDays} days</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </Modal>

      <Modal isOpen={faqModalOpen} toggle={() => setFaqModalOpen(!faqModalOpen)} size="lg">
        <ModalHeader toggle={() => setFaqModalOpen(!faqModalOpen)}>
          Frequently Asked Questions
        </ModalHeader>
        <ModalBody>
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </ModalBody>
      </Modal>
    </Container>
    </div>
  );
};

export default SubscriptionPlansComponent;