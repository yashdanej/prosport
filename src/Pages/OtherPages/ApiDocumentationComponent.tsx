import React, { useState } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Button, Input, Table, Alert } from 'reactstrap';
import { Code, PlayCircle, Key, Book } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ApiDocumentationComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('quickstart');
  const [selectedLanguage, setSelectedLanguage] = useState<any>('curl');
  const [apiResponse, setApiResponse] = useState<any>('');

  const codeExamples: any = {
    curl: `curl -X GET "https://api.prosportsapi.com/v1/football/matches" \\
-H "Authorization: Bearer YOUR_API_KEY"`,
    python: `import requests

url = "https://api.prosportsapi.com/v1/football/matches"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`,
    javascript: `fetch('https://api.prosportsapi.com/v1/football/matches', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`
  };

  const endpoints = [
    { method: 'GET', path: '/v1/football/matches', description: 'Get all football matches' },
    { method: 'GET', path: '/v1/football/matches/{id}', description: 'Get a specific football match' },
    { method: 'POST', path: '/v1/football/matches', description: 'Create a new football match' },
    { method: 'PUT', path: '/v1/football/matches/{id}', description: 'Update a football match' },
    { method: 'DELETE', path: '/v1/football/matches/{id}', description: 'Delete a football match' },
  ];

  const handleApiTest = () => {
    // Simulated API call
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        status: 'success',
        data: {
          matches: [
            { id: 1, teamHome: 'Team A', teamAway: 'Team B', score: '2-1' },
            { id: 2, teamHome: 'Team C', teamAway: 'Team D', score: '0-0' }
          ]
        }
      }, null, 2));
    }, 1000);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">API Documentation</h1>
      <Row>
        <Col md={3}>
          <Nav vertical pills>
            <NavItem>
              <NavLink
                className={activeTab === 'quickstart' ? 'active' : ''}
                onClick={() => setActiveTab('quickstart')}
              >
                <PlayCircle size={18} className="me-2" />
                Quick Start
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'authentication' ? 'active' : ''}
                onClick={() => setActiveTab('authentication')}
              >
                <Key size={18} className="me-2" />
                Authentication
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'endpoints' ? 'active' : ''}
                onClick={() => setActiveTab('endpoints')}
              >
                <Book size={18} className="me-2" />
                Endpoints
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'codesamples' ? 'active' : ''}
                onClick={() => setActiveTab('codesamples')}
              >
                <Code size={18} className="me-2" />
                Code Samples
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === 'apitester' ? 'active' : ''}
                onClick={() => setActiveTab('apitester')}
              >
                {/* <Tool size={18} className="me-2" /> */}
                API Tester
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md={9}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="quickstart">
              <Card>
                <CardBody>
                  <h2>Quick Start Guide</h2>
                  <ol>
                    <li>Sign up for an API key in your account settings.</li>
                    <li>Include your API key in the Authorization header of your requests.</li>
                    <li>Make API requests to our endpoints.</li>
                  </ol>
                  <Alert color="info">
                    Base URL for all API requests: <code>https://api.prosportsapi.com/v1</code>
                  </Alert>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="authentication">
              <Card>
                <CardBody>
                  <h2>Authentication</h2>
                  <p>All API requests require authentication using an API key.</p>
                  <h4>How to include your API key:</h4>
                  <SyntaxHighlighter language="http" style={docco}>
                    {`Authorization: Bearer YOUR_API_KEY`}
                  </SyntaxHighlighter>
                  <Alert color="warning" className="mt-3">
                    Keep your API key secure and do not share it publicly.
                  </Alert>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="endpoints">
              <Card>
                <CardBody>
                  <h2>API Endpoints</h2>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints.map((endpoint, index) => (
                        <tr key={index}>
                          <td><code>{endpoint.method}</code></td>
                          <td><code>{endpoint.path}</code></td>
                          <td>{endpoint.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="codesamples">
              <Card>
                <CardBody>
                  <h2>Code Samples</h2>
                  <div className="mb-3">
                    <Button color="primary" onClick={() => setSelectedLanguage('curl')} active={selectedLanguage === 'curl'} className="me-2">cURL</Button>
                    <Button color="primary" onClick={() => setSelectedLanguage('python')} active={selectedLanguage === 'python'} className="me-2">Python</Button>
                    <Button color="primary" onClick={() => setSelectedLanguage('javascript')} active={selectedLanguage === 'javascript'}>JavaScript</Button>
                  </div>
                  <SyntaxHighlighter language={selectedLanguage === 'curl' ? 'bash' : selectedLanguage} style={docco}>
                    {codeExamples[selectedLanguage]}
                  </SyntaxHighlighter>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="apitester">
              <Card>
                <CardBody>
                  <h2>API Tester</h2>
                  <Input type="select" className="mb-3">
                    <option>GET /v1/football/matches</option>
                    <option>POST /v1/football/matches</option>
                    <option>PUT /v1/football/matches/{'{id}'}</option>
                    <option>DELETE /v1/football/matches/{'{id}'}</option>
                  </Input>
                  <Button color="primary" onClick={handleApiTest}>Test API</Button>
                  {apiResponse && (
                    <div className="mt-3">
                      <h4>Response:</h4>
                      <SyntaxHighlighter language="json" style={docco}>
                        {apiResponse}
                      </SyntaxHighlighter>
                    </div>
                  )}
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