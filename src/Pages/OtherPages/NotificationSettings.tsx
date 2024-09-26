import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const NotificationSettings = () => {
  // ... notification settings logic ...
  const [notification, setNotification] = useState<any>({
    newLogin: true,
    subscription: true,
    apiUsage: true
  });
  const handleNotificationChange = (e: any) => {
    setNotification({ ...notification, [e.target.name]: e.target.checked });
  };
  return (
    <Card>
      <CardBody>
        <h3>Notification Preferences</h3>
        <Card className="mt-4">
            <CardBody>
              <h3>Notification Preferences</h3>
              <Form>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="newLogin" checked={notification.newLogin} onChange={handleNotificationChange} />{' '}
                    Notify on new login
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="subscription" checked={notification.subscription} onChange={handleNotificationChange} />{' '}
                    Notify when subscription expires
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="apiUsage" checked={notification.apiUsage} onChange={handleNotificationChange} />{' '}
                    Notify when API usage is about to reach limit
                  </Label>
                </FormGroup>
                <Button color="primary" className="mt-3" onClick={() => alert('Notification preferences updated!')}>Save Preferences</Button>
              </Form>
            </CardBody>
          </Card>
      </CardBody>
    </Card>
  );
};

export default NotificationSettings;