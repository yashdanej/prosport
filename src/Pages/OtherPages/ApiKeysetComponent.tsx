import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Progress, Form, FormGroup, Label } from 'reactstrap';
import { Copy, RefreshCw, Eye, EyeOff, Plus, Search, Download, RotateCcw, Shield, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApiKeysetComponent = () => {
  const [apiKeys, setApiKeys] = useState<any>([]);
  const [showSecretKey, setShowSecretKey] = useState<any>({});
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [newKeyCategory, setNewKeyCategory] = useState<any>('');
  const [copiedAlert, setCopiedAlert] = useState<any>({ show: false, id: null });
  const [activeTab, setActiveTab] = useState<any>('active');
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [sortColumn, setSortColumn] = useState<any>('');
  const [sortDirection, setSortDirection] = useState<any>('asc');
  const [selectedKey, setSelectedKey] = useState<any>(null);
  const [usageMetrics, setUsageMetrics] = useState<any>([]);
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const [whitelistModalOpen, setWhitelistModalOpen] = useState<any>(false);
  const [whitelistData, setWhitelistData] = useState<any>({ domains: '', ips: '' });

  useEffect(() => {
    fetchApiKeys();
    fetchUsageMetrics();
  }, []);

  const fetchApiKeys = async () => {
    // Simulated API call
    const keys: any = [
      { id: 1, category: 'Cricket', plan: 'Starter Bundle', tokenExpiry: '2024-12-10', secretKey: 'bd51vfbO2fB407k', accessKey: 'gsk4nRr9jBdhnzzgp7p', domain: '', status: 'Active', usageLimit: 10000, usageCount: 5000 },
      { id: 2, category: 'Football', plan: 'Pro Plan', tokenExpiry: '2024-11-15', secretKey: 'ay72kfbR3gC508m', accessKey: 'htn5Ss0kCeijaaih8q', domain: 'example.com', status: 'Active', usageLimit: 50000, usageCount: 20000 },
      { id: 3, category: 'Tennis', plan: 'Basic Plan', tokenExpiry: '2024-10-20', secretKey: 'cx93lfbT4hD609n', accessKey: 'jvp6Tt1lDfjkbbjh9r', domain: '', status: 'Revoked', usageLimit: 5000, usageCount: 5000 }
    ];
    setApiKeys(keys);
  };

  const fetchUsageMetrics = async () => {
    // Simulated API call for usage metrics
    const metrics = [
      { date: '2023-01-01', calls: 1000 },
      { date: '2023-01-02', calls: 1200 },
      { date: '2023-01-03', calls: 800 },
      { date: '2023-01-04', calls: 1500 },
      { date: '2023-01-05', calls: 2000 },
      { date: '2023-01-06', calls: 1800 },
      { date: '2023-01-07', calls: 1600 }
    ];
    setUsageMetrics(metrics);
  };

  const toggleSecretKey = (id: any) => {
    setShowSecretKey((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: any, id: any) => {
    navigator.clipboard.writeText(text);
    setCopiedAlert({ show: true, id });
    setTimeout(() => setCopiedAlert({ show: false, id: null }), 2000);
  };

  const generateNewKey = () => {
    // Implement key generation logic
    setModalOpen(false);
    fetchApiKeys();
  };

  const revokeKey = (id: any) => {
    // Implement key revocation logic
    fetchApiKeys();
  };

  const rotateKey = (id: any) => {
    // Implement key rotation logic
    fetchApiKeys();
  };

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredKeys = apiKeys.filter((key: any) => 
    (activeTab === 'all' || (activeTab === 'active' && key.status === 'Active') || (activeTab === 'revoked' && key.status === 'Revoked')) &&
    (key.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     key.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
     key.accessKey.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedKeys = [...filteredKeys].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const updateWhitelist = () => {
    // Implement whitelist update logic
    console.log('Updating whitelist for key:', selectedKey.id, whitelistData);
    setWhitelistModalOpen(false);
    fetchApiKeys();
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      <h1 className="mb-4">API Keyset Management</h1>
      <Row className="mb-3">
        <Col md={4}>
          <Input
            type="text"
            placeholder="Search keys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            placeholderText="Select date range for metrics"
            className="form-control"
          />
        </Col>
        <Col md={4}>
          <Button color="primary" onClick={() => setModalOpen(true)}>
            <Plus size={18} className="me-2" />
            Generate New API Key
          </Button>
        </Col>
      </Row>

      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink
            className={activeTab === 'active' ? 'active' : ''}
            onClick={() => setActiveTab('active')}
          >
            Active Keys
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'revoked' ? 'active' : ''}
            onClick={() => setActiveTab('revoked')}
          >
            Revoked Keys
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Keys
          </NavLink>
        </NavItem>
      </Nav>

      <Table responsive striped className="mt-3">
        <thead>
          <tr>
            {['Category', 'Plan', 'Token Expiry', 'Secret Key', 'Access Key', 'Domain', 'Status', 'Usage', 'Actions'].map(header => (
              <th key={header} onClick={() => handleSort(header.toLowerCase())}>
                {header} {sortColumn === header.toLowerCase() && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedKeys.map(key => (
            <tr key={key.id}>
              <td>{key.category}</td>
              <td>{key.plan}</td>
              <td>{key.tokenExpiry}</td>
              <td>
                {showSecretKey[key.id] ? key.secretKey : '••••••••••••••••'}
                <Button color="link" size="sm" onClick={() => toggleSecretKey(key.id)}>
                  {showSecretKey[key.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Button color="link" size="sm" onClick={() => copyToClipboard(key.secretKey, `secret-${key.id}`)}>
                  <Copy size={18} />
                </Button>
                {copiedAlert.show && copiedAlert.id === `secret-${key.id}` && (
                  <Alert color="success" className="mt-2 p-1">Copied!</Alert>
                )}
              </td>
              <td>
                {key.accessKey}
                <Button color="link" size="sm" onClick={() => copyToClipboard(key.accessKey, `access-${key.id}`)}>
                  <Copy size={18} />
                </Button>
                {copiedAlert.show && copiedAlert.id === `access-${key.id}` && (
                  <Alert color="success" className="mt-2 p-1">Copied!</Alert>
                )}
              </td>
              <td>{key.domain || 'Not set'}</td>
              <td><Badge color={key.status === 'Active' ? 'success' : 'danger'}>{key.status}</Badge></td>
              <td>
                <Progress value={(key.usageCount / key.usageLimit) * 100} className="mb-2">
                  {Math.round((key.usageCount / key.usageLimit) * 100)}%
                </Progress>
                {key.usageCount} / {key.usageLimit}
              </td>
              <td>
                <Button color="warning" size="sm" className="me-2" onClick={() => revokeKey(key.id)}>
                  Revoke
                </Button>
                <Button color="info" size="sm" className="me-2" onClick={() => rotateKey(key.id)}>
                  <RotateCcw size={18} />
                </Button>
                <Button color="secondary" size="sm" onClick={() => setSelectedKey(key)}>
                  <Activity size={18} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Generate New API Key</ModalHeader>
        <ModalBody>
          <Input
            type="select"
            value={newKeyCategory}
            onChange={(e) => setNewKeyCategory(e.target.value)}
            className="mb-3"
          >
            <option value="">Select Category</option>
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Tennis">Tennis</option>
          </Input>
          {/* Add more fields as needed for key generation */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={generateNewKey}>Generate</Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={!!selectedKey} toggle={() => setSelectedKey(null)} size="lg">
        <ModalHeader toggle={() => setSelectedKey(null)}>Usage Metrics for {selectedKey?.accessKey}</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <h5>API Calls Over Time</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calls" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

      <Modal isOpen={whitelistModalOpen} toggle={() => setWhitelistModalOpen(!whitelistModalOpen)}>
        <ModalHeader toggle={() => setWhitelistModalOpen(!whitelistModalOpen)}>
          Update Whitelist for {selectedKey?.accessKey}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="domains">Whitelisted Domains (comma-separated)</Label>
              <Input
                type="textarea"
                name="domains"
                id="domains"
                value={whitelistData.domains}
                onChange={(e) => setWhitelistData({...whitelistData, domains: e.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ips">Whitelisted IPs (comma-separated)</Label>
              <Input
                type="textarea"
                name="ips"
                id="ips"
                value={whitelistData.ips}
                onChange={(e) => setWhitelistData({...whitelistData, ips: e.target.value})}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateWhitelist}>Update</Button>
          <Button color="secondary" onClick={() => setWhitelistModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default ApiKeysetComponent;