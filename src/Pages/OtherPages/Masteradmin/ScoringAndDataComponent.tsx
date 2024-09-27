import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Button, Form, FormGroup, Label, Input, Table, Alert } from 'reactstrap';
import { Upload, Check, X, RefreshCw } from 'lucide-react';

const ScoringAndDataComponent = () => {
  const [activeTab, setActiveTab] = useState<any>('liveScoring');
  const [liveMatches, setLiveMatches] = useState<any>([]);
  const [manualScoringData, setManualScoringData] = useState<any>({ match: '', score: '', details: '' });
  const [dataEntryFields, setDataEntryFields] = useState<any>([{ name: '', value: '' }]);
  const [dataToValidate, setDataToValidate] = useState<any>('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [fileUpload, setFileUpload] = useState<any>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);

  useEffect(() => {
    // Fetch live matches data
    fetchLiveMatches();
    // Set up interval to refresh live data
    const interval = setInterval(fetchLiveMatches, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLiveMatches = async () => {
    // Replace with actual API call
    const mockLiveMatches = [
      { id: 1, teams: 'Team A vs Team B', score: '2-1', status: 'In Progress' },
      { id: 2, teams: 'Team C vs Team D', score: '0-0', status: 'First Half' },
    ];
    setLiveMatches(mockLiveMatches);
  };

  const handleManualScoring = (e: any) => {
    e.preventDefault();
    // Implement manual scoring logic
    console.log('Manual scoring data:', manualScoringData);
    // Reset form after submission
    setManualScoringData({ match: '', score: '', details: '' });
  };

  const handleDataEntry = (e: any) => {
    e.preventDefault();
    // Implement data entry logic
    console.log('Data entry fields:', dataEntryFields);
    // Reset form after submission
    setDataEntryFields([{ name: '', value: '' }]);
  };

  const addDataEntryField = () => {
    setDataEntryFields([...dataEntryFields, { name: '', value: '' }]);
  };

  const handleDataValidation = (e: any) => {
    e.preventDefault();
    // Implement data validation logic
    const isValid = Math.random() > 0.5; // Simulated validation
    setValidationResult({
      isValid,
      message: isValid ? 'Data is valid' : 'Data validation failed',
    });
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };

  const uploadHistoricalData = () => {
    if (!fileUpload) {
      setUploadResult({ success: false, message: 'No file selected' });
      return;
    }

    // Simulated file upload and processing
    setTimeout(() => {
      setUploadResult({ success: true, message: 'File uploaded and processed successfully' });
      setFileUpload(null);
    }, 2000);
  };

  return (
    <div className="page-body">
    <Container fluid>
      <h1 className="mb-4">Scoring & Data Management</h1>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === 'liveScoring' ? 'active' : ''}
            onClick={() => setActiveTab('liveScoring')}
          >
            Live Scoring
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'manualScoring' ? 'active' : ''}
            onClick={() => setActiveTab('manualScoring')}
          >
            Manual Scoring
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'dataEntry' ? 'active' : ''}
            onClick={() => setActiveTab('dataEntry')}
          >
            Data Entry
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'dataValidation' ? 'active' : ''}
            onClick={() => setActiveTab('dataValidation')}
          >
            Data Validation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'historicalData' ? 'active' : ''}
            onClick={() => setActiveTab('historicalData')}
          >
            Historical Data
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="liveScoring">
          <Card className="mt-3">
            <CardBody>
              <h3>Live Matches</h3>
              <Button color="primary" className="mb-3" onClick={fetchLiveMatches}>
                <RefreshCw size={18} className="me-2" />
                Refresh Data
              </Button>
              <Table striped>
                <thead>
                  <tr>
                    <th>Match</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {liveMatches.map((match: any) => (
                    <tr key={match.id}>
                      <td>{match.teams}</td>
                      <td>{match.score}</td>
                      <td>{match.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="manualScoring">
          <Card className="mt-3">
            <CardBody>
              <h3>Manual Scoring</h3>
              <Form onSubmit={handleManualScoring}>
                <FormGroup>
                  <Label for="match">Match</Label>
                  <Input
                    type="text"
                    name="match"
                    id="match"
                    value={manualScoringData.match}
                    onChange={(e) => setManualScoringData({...manualScoringData, match: e.target.value})}
                    placeholder="Enter match details"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="score">Score</Label>
                  <Input
                    type="text"
                    name="score"
                    id="score"
                    value={manualScoringData.score}
                    onChange={(e) => setManualScoringData({...manualScoringData, score: e.target.value})}
                    placeholder="Enter score"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="details">Additional Details</Label>
                  <Input
                    type="textarea"
                    name="details"
                    id="details"
                    value={manualScoringData.details}
                    onChange={(e) => setManualScoringData({...manualScoringData, details: e.target.value})}
                    placeholder="Enter additional match details"
                  />
                </FormGroup>
                <Button color="primary" type="submit">Submit Score</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="dataEntry">
          <Card className="mt-3">
            <CardBody>
              <h3>Data Entry</h3>
              <Form onSubmit={handleDataEntry}>
                {dataEntryFields.map((field: any, index: any) => (
                  <Row key={index} className="mb-3">
                    <Col md={6}>
                      <Input
                        type="text"
                        value={field.name}
                        onChange={(e) => {
                          const newFields = [...dataEntryFields];
                          newFields[index].name = e.target.value;
                          setDataEntryFields(newFields);
                        }}
                        placeholder="Field Name"
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          const newFields = [...dataEntryFields];
                          newFields[index].value = e.target.value;
                          setDataEntryFields(newFields);
                        }}
                        placeholder="Field Value"
                      />
                    </Col>
                  </Row>
                ))}
                <Button type="button" color="secondary" onClick={addDataEntryField} className="mb-3">
                  Add Field
                </Button>
                <Button color="primary" type="submit" className="ms-2">Submit Data</Button>
              </Form>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="dataValidation">
          <Card className="mt-3">
            <CardBody>
              <h3>Data Validation</h3>
              <Form onSubmit={handleDataValidation}>
                <FormGroup>
                  <Label for="dataToValidate">Enter Data to Validate</Label>
                  <Input
                    type="textarea"
                    name="dataToValidate"
                    id="dataToValidate"
                    value={dataToValidate}
                    onChange={(e) => setDataToValidate(e.target.value)}
                    placeholder="Enter data in JSON format"
                    rows="5"
                  />
                </FormGroup>
                <Button color="primary" type="submit">Validate Data</Button>
              </Form>
              {validationResult && (
                <Alert color={validationResult.isValid ? 'success' : 'danger'} className="mt-3">
                  {validationResult.message}
                </Alert>
              )}
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="historicalData">
          <Card className="mt-3">
            <CardBody>
              <h3>Upload Historical Data</h3>
              <FormGroup>
                <Label for="fileUpload">Select JSON File</Label>
                <Input type="file" name="fileUpload" id="fileUpload" onChange={handleFileUpload} accept=".json" />
              </FormGroup>
              <Button color="primary" onClick={uploadHistoricalData} disabled={!fileUpload}>
                <Upload size={18} className="me-2" />
                Upload and Process
              </Button>
              {uploadResult && (
                <Alert color={uploadResult.success ? 'success' : 'danger'} className="mt-3">
                  {uploadResult.message}
                </Alert>
              )}
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </Container>
    </div>
  );
};

export default ScoringAndDataComponent;