import React, { useEffect, useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const ChangeLog = () => {
  // ... notification settings logic ...
  const [changelogItems, setChangelogItems] = useState<any>([]);

  useEffect(() => {
    // Fetch changelog data
    fetchChangelog();
  }, []);

  const fetchChangelog = () => {
    // Simulated API call
    const mockChangelog = [
      { version: '1.2.0', date: '2024-05-15', changes: ['Added new cricket statistics', 'Improved API response time'] },
      { version: '1.1.5', date: '2024-04-01', changes: ['Bug fixes', 'Updated documentation'] },
      { version: '1.1.0', date: '2024-03-10', changes: ['Introduced football live scores', 'Enhanced user dashboard'] },
    ];
    setChangelogItems(mockChangelog);
  };
  return (
    <Card>
      <CardBody>
        <h3>Change Log</h3>
        <ListGroup>
                {changelogItems.map((item: any, index: any) => (
                  <ListGroupItem key={index}>
                    <h5>
                      <Badge color="primary" pill>v{item.version}</Badge>
                      <small className="text-muted ml-2">{item.date}</small>
                    </h5>
                    <ul>
                      {item.changes.map((change: any, changeIndex: any) => (
                        <li key={changeIndex}>{change}</li>
                      ))}
                    </ul>
                  </ListGroupItem>
                ))}
              </ListGroup>
      </CardBody>
    </Card>
  );
};

export default ChangeLog;