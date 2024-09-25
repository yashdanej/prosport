import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Collapse, Input, Form, FormGroup, Label, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { ChevronDown, ChevronUp, Search, Send, List } from 'lucide-react';

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <Button
        color="light"
        onClick={() => setIsOpen(!isOpen)}
        className="w-100 text-left d-flex justify-content-between align-items-center"
      >
        {question}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>{answer}</CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

const CustomSupportComponent = () => {
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [ticketForm, setTicketForm] = useState<any>({ subject: '', description: '', email: '' });
  const [tickets, setTickets] = useState<any>([]);
  const [showTickets, setShowTickets] = useState<any>(false);
  const [submitSuccess, setSubmitSuccess] = useState<any>(false);

  const faqs = [
    {
      question: "How do I get an API key?",
      answer: "You can obtain an API key by registering for an account and navigating to the API Keys section in your dashboard."
    },
    {
      question: "What sports does your API cover?",
      answer: "Our API covers a wide range of sports including football, basketball, cricket, tennis, and more. Check our documentation for a full list."
    },
    {
      question: "How often is the data updated?",
      answer: "Data is updated in real-time for live events. Historical data is typically updated within 24 hours of an event concluding."
    },
    {
      question: "What is the rate limit for API calls?",
      answer: "Rate limits vary depending on your subscription plan. Basic plans typically allow for 1000 calls per day, while higher tiers offer increased limits."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 7-day free trial for new users. You can sign up for a trial account to test our API functionality."
    },
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: any) => {
    setTicketForm({ ...ticketForm, [e.target.name]: e.target.value });
  };

  const handleSubmitTicket = (e: any) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    const newTicket = { ...ticketForm, id: Date.now(), status: 'Open' };
    setTickets([...tickets, newTicket]);
    setTicketForm({ subject: '', description: '', email: '' });
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Support</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <CardBody>
              <h2 className="mb-3">Frequently Asked Questions</h2>
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              {filteredFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <CardBody>
              <h3>Submit a Support Ticket</h3>
              <Form onSubmit={handleSubmitTicket}>
                <FormGroup>
                  <Label for="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={ticketForm.description}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Your Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={ticketForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  <Send size={20} className="me-2" />
                  Submit Ticket
                </Button>
              </Form>
              {submitSuccess && (
                <Alert color="success" className="mt-3">
                  Ticket submitted successfully!
                </Alert>
              )}
            </CardBody>
          </Card>
          <Button color="secondary" onClick={() => setShowTickets(!showTickets)} className="mb-3">
            <List size={20} className="me-2" />
            {showTickets ? 'Hide Tickets' : 'Show My Tickets'}
          </Button>
          {showTickets && (
            <Card>
              <CardBody>
                <h3>My Tickets</h3>
                <ListGroup>
                  {tickets.map((ticket: any) => (
                    <ListGroupItem key={ticket.id} className="d-flex justify-content-between align-items-center">
                      {ticket.subject}
                      <Badge color={ticket.status === 'Open' ? 'warning' : 'success'} pill>
                        {ticket.status}
                      </Badge>
                    </ListGroupItem>
                  ))}
                </ListGroup>
                {tickets.length === 0 && <p>No tickets submitted yet.</p>}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CustomSupportComponent;