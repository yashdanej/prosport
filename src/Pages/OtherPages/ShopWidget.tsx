import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Search, Code, Bell } from 'lucide-react';

// Mock data for widgets
const widgets = [
  { id: 1, name: 'Live Scoring', description: 'Real-time scores for ongoing matches', icon: '🏏', category: 'cricket' },
  { id: 2, name: 'Match Details', description: 'Comprehensive match information and statistics', icon: '📊', category: 'football' },
  { id: 3, name: 'Player Profile', description: 'Detailed player stats and information', icon: '👤', category: 'basketball' },
  { id: 4, name: 'Match Prediction', description: 'AI-powered match outcome predictions', icon: '🔮', category: 'cricket' },
  { id: 5, name: 'Mobile App Scoring', description: 'Embeddable live scoring for mobile apps', icon: '📱', category: 'football' },
  { id: 6, name: 'Gift Voucher/Offers', description: 'Display sports-related offers and coupons', icon: '🎁', category: 'general' },
];

const ShopWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredWidgets = widgets.filter(widget => 
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || widget.category === filter)
  );

  const handleGetCode = (widgetId: any) => {
    // Logic to generate and display embed code
    console.log(`Generate code for widget ${widgetId}`);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">Shop Widget</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><Search size={18} /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="general">General</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredWidgets.map(widget => (
          <Col key={widget.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{widget.icon} {widget.name}</Card.Title>
                <Card.Text>{widget.description}</Card.Text>
                <Button variant="primary" onClick={() => handleGetCode(widget.id)}>
                  <Code size={18} className="me-2" />
                  Get Code
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Coming Soon</h3>
          <p>More exciting widgets are on the way! Sign up to get notified when they launch.</p>
          <InputGroup>
            <Form.Control type="email" placeholder="Enter your email" />
            <Button variant="outline-secondary">
              <Bell size={18} className="me-2" />
              Notify Me
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>How to Embed Widgets</h3>
          <ol>
            <li>Click the "Get Code" button on the widget you want to use.</li>
            <li>Copy the generated code snippet.</li>
            <li>Paste the code into your website or app where you want the widget to appear.</li>
            <li>Customize the widget appearance using the provided options in the code.</li>
          </ol>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ShopWidget;