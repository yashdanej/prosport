import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Collapse, Input } from 'reactstrap';
import { ChevronDown, ChevronUp, MessageCircle, Search } from 'lucide-react';
// import FreshchatIntegration from './FreshchatIntegration';

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

const SupportComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
    // Add more FAQs as needed
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Card>
            <CardBody>
              <h3>Need More Help?</h3>
              <p>If you can't find the answer you're looking for, our support team is here to help.</p>
              {/* <FreshchatIntegration /> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SupportComponent;