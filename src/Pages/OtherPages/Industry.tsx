import React, { useState } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Industry = () => {
  const [industry, setIndustry] = useState<any>('');

  const handleIndustryChange = (e: any) => {
    setIndustry(e.target.value);
  };

  return (
    <Card>
      <CardBody>
        <h3>Industry</h3>
        <FormGroup>
          <Label for="industry">Industry</Label>
          <Input type="select" name="industry" id="industry" value={industry} onChange={handleIndustryChange}>
            <option value="">Select an industry</option>
            <option value="sports">Sports</option>
            <option value="betting">Betting</option>
            <option value="media">Media</option>
            <option value="technology">Technology</option>
            <option value="other">Other</option>
          </Input>
        </FormGroup>
        <Button color="primary" onClick={() => alert(`Industry set to: ${industry}`)}>Save Industry</Button>
      </CardBody>
    </Card>
  );
};

export default Industry;