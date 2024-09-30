import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Button, Input, Table, Alert } from 'reactstrap';
import { Book, Key, Code, PlayCircle, FileText, Search, Clock } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ApiDocumentationComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('introduction');
  const [selectedLanguage, setSelectedLanguage] = useState<any>('curl');
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [filteredEndpoints, setFilteredEndpoints] = useState<any>([]);

  const endpoints = [
    {
      method: 'GET',
      path: '/v1/competitions',
      description: 'Get all available competitions',
      responseFormat: {
        id: 'number',
        name: 'string',
        sport: 'string',
        season: 'string'
      },
      exampleResponse: `{
  "competitions": [
    {
      "id": 1,
      "name": "English Premier League",
      "sport": "Football",
      "season": "2023/2024"
    },
    // ... more competitions
  ]
}`
    },
    {
      method: 'GET',
      path: '/v1/competition-overview/{id}',
      description: 'Get details about a specific competition',
      responseFormat: {
        id: 'number',
        name: 'string',
        sport: 'string',
        season: 'string',
        teams: 'array of objects'
      },
      exampleResponse: `{
  "id": 1,
  "name": "English Premier League",
  "sport": "Football",
  "season": "2023/2024",
  "teams": [
    {
      "id": 1,
      "name": "Manchester United",
      "shortName": "MUN"
    },
    // ... more teams
  ]
}`
    },
    // Add more endpoints here...
  ];

  const codeExamples: any = {
    curl: `curl --location 'http://api.prosportsapi.com/v1/competitions?token=YOUR_API_TOKEN'`,
    python: `import requests

url = "http://api.prosportsapi.com/v1/competitions"
params = {"token": "YOUR_API_TOKEN"}

response = requests.get(url, params=params)
print(response.json())`,
    javascript: `fetch('http://api.prosportsapi.com/v1/competitions?token=YOUR_API_TOKEN')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    php: `<?php
$url = 'http://api.prosportsapi.com/v1/competitions?token=YOUR_API_TOKEN';
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data);
?>`,
    ruby: `require 'net/http'
require 'json'

url = URI('http://api.prosportsapi.com/v1/competitions?token=YOUR_API_TOKEN')
response = Net::HTTP.get(url)
data = JSON.parse(response)
puts data`
  };

  const changelog = [
    {
      version: '2.1.0',
      date: '2023-09-15',
      changes: [
        'Added new endpoint for player statistics',
        'Improved response time for match details endpoint',
        'Fixed bug in team standings calculation'
      ]
    },
    {
      version: '2.0.0',
      date: '2023-08-01',
      changes: [
        'Major API overhaul with breaking changes',
        'Introduced new authentication method',
        'Added support for more sports leagues'
      ]
    },
    // Add more changelog entries...
  ];

  useEffect(() => {
    setFilteredEndpoints(
      endpoints.filter(endpoint => 
        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const renderEndpointDetails = (endpoint: any) => (
    <div key={endpoint.path} className="mb-4">
      <h4><code>{endpoint.method} {endpoint.path}</code></h4>
      <p>{endpoint.description}</p>
      <h5>Response Format:</h5>
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(endpoint.responseFormat, null, 2)}
      </SyntaxHighlighter>
      <h5>Example Response:</h5>
      <SyntaxHighlighter language="json" style={docco}>
        {endpoint.exampleResponse}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        <h1 className="mb-4">ProSportsAPI Developer Documentation</h1>
        <Row>
          <Col md={3}>
            <Nav vertical pills>
              {['introduction', 'authentication', 'endpoints', 'codesamples', 'ratelimit', 'changelog'].map(tab => (
                <NavItem key={tab}>
                  <NavLink
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'introduction' && <FileText size={18} className="me-2" />}
                    {tab === 'authentication' && <Key size={18} className="me-2" />}
                    {tab === 'endpoints' && <Book size={18} className="me-2" />}
                    {tab === 'codesamples' && <Code size={18} className="me-2" />}
                    {tab === 'ratelimit' && <PlayCircle size={18} className="me-2" />}
                    {tab === 'changelog' && <Clock size={18} className="me-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Col>
          <Col md={9}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="introduction">
                <Card>
                  <CardBody>
                    <h2>Introduction</h2>
                    <p>ProSportsAPI provides developers with access to data related to sports events and outcomes from various sources. Our API allows you to access structured data from different sports leagues, teams, and competitions, making it easier to create applications, websites, and services that require this information.</p>
                    <Alert color="info">
                      Base URL for all API requests: <code>http://api.prosportsapi.com/v1</code>
                    </Alert>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="authentication">
                <Card>
                  <CardBody>
                    <h2>Authentication</h2>
                    <p>All API requests require authentication using an API token.</p>
                    <h4>How to include your API token:</h4>
                    <p>Add the token as a query parameter to your API requests:</p>
                    <SyntaxHighlighter language="http" style={docco}>
                      {`http://api.prosportsapi.com/v1/endpoint?token=YOUR_API_TOKEN`}
                    </SyntaxHighlighter>
                    <Alert color="warning" className="mt-3">
                      Keep your API token secure and do not share it publicly.
                    </Alert>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="endpoints">
                <Card>
                  <CardBody>
                    <h2>API Endpoints</h2>
                    <Input 
                      type="text" 
                      placeholder="Search endpoints..." 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-3"
                    />
                    {filteredEndpoints.map(renderEndpointDetails)}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="codesamples">
                <Card>
                  <CardBody>
                    <h2>Code Samples</h2>
                    <p>Here are examples of how to use our API in different programming languages:</p>
                    <div className="mb-3">
                      {Object.keys(codeExamples).map(lang => (
                        <Button 
                          key={lang}
                          color="primary" 
                          onClick={() => setSelectedLanguage(lang)} 
                          active={selectedLanguage === lang} 
                          className="me-2 mb-2"
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </Button>
                      ))}
                    </div>
                    <SyntaxHighlighter language={selectedLanguage === 'curl' ? 'bash' : selectedLanguage} style={docco}>
                      {codeExamples[selectedLanguage]}
                    </SyntaxHighlighter>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="ratelimit">
                <Card>
                  <CardBody>
                    <h2>Rate Limit</h2>
                    <p>To ensure the smooth operation of our API and prevent abuse, we have a rate limit policy in place. This policy limits the number of requests that a user can send to our API within a specific time period.</p>
                    <Alert color="info">
                      Please contact our support team for specific details about your account's rate limit.
                    </Alert>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="changelog">
                <Card>
                  <CardBody>
                    <h2>Changelog</h2>
                    {changelog.map((entry, index) => (
                      <div key={index} className="mb-4">
                        <h4>{entry.version} - {entry.date}</h4>
                        <ul>
                          {entry.changes.map((change, changeIndex) => (
                            <li key={changeIndex}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApiDocumentationComponent;