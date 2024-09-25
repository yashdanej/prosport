import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, CardBody, CardTitle, Table, Progress, Alert, Modal, ModalBody, ModalHeader, Button, Tooltip } from 'reactstrap'
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts'
import { Bell, Key, FileText, Eye, Download } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { AppDispatch, RootState } from '../../ReduxToolkit/Store'
import { getApiKeys, getBilling, getSubscribe } from '../../ReduxToolkit/Reducers/Change/Subscribe'
import { getAnalyticsData } from '../../ReduxToolkit/Reducers/Change/AnalyticsSlice'
import { getLogEvents } from '../../ReduxToolkit/Reducers/Change/AuthSlice'
import InvoiceTwo from '../Application/Ecommerce/Invoices/Invoice-2/Invoice-2'
import { Link } from 'react-router-dom'

const EnhancedDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const apiKeyData = useSelector((state: RootState) => state.subscribe.api_keys)
  const analyticsData = useSelector((state: RootState) => state.analytics.analytics)
  const billingData = useSelector((state: RootState) => state.subscribe.billing)
  const plansData = useSelector((state: RootState) => state.subscribe.plans)
  const logEventsData = useSelector((state: RootState) => state.auth.logs)

  const [invoiceData, setInvoiceData] = useState(null)
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const invoiceContainerRef = useRef(null)

  useEffect(() => {
    dispatch(getApiKeys())
    dispatch(getAnalyticsData())
    dispatch(getBilling())
    dispatch(getSubscribe())
    dispatch(getLogEvents())
  }, [dispatch])

  const getHits = (from: 'total' | 'pending' | 'used') => {
    const plan = plansData?.data?.find((plan: any) => plan?.id === apiKeyData?.data?.[0]?.planId)
    if (!plan) return 'Not subscribed'
    if (apiKeyData?.data?.[0]?.api_hits >= parseInt(plan.api_call.split(' ')[0])) return 'API call limit reached'
    if (apiKeyData?.data?.[0]?.status === false) return 'Plan expired'

    const totalHits = parseInt(plan.api_call.split(' ')[0])
    const usedHits = apiKeyData?.data?.[0]?.api_hits || 0
    switch (from) {
      case 'total': return totalHits
      case 'pending': return totalHits - usedHits
      case 'used': return usedHits
    }
  }

  const apiUsageData = analyticsData?.data?.map((item: any) => ({
    name: item.name,
    calls: item.count,
  })) || []

  const toggleTooltip = (id: string) => {
    setTooltipOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleDownloadPdf = (invoiceData: any) => {
    const element = invoiceContainerRef.current
    setInvoiceData(invoiceData)
    const opt = {
      margin: 0.02,
      filename: `${invoiceData.invoice}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' },
    }
    html2pdf().from(element).set(opt).save()
  }

  const handleViewInvoice = (invoiceData: any) => {
    setInvoiceData(invoiceData)
    toggleModal()
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        {/* <h1 className="mb-4">Dashboard</h1> */}
        
        <Alert color="info" className="d-flex align-items-center">
          <Bell size={20} className="me-2" />
          API Status: {apiKeyData?.data?.[0]?.status ? 'Operational' : 'Inactive'}
        </Alert>

        <Row className="mb-4">
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Total Hits</CardTitle>
                <h2>{getHits('total')}</h2>
                <Progress value={75} className="mt-2" />
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Pending Hits</CardTitle>
                <h2>{getHits('pending')}</h2>
                <Progress value={25} color="warning" className="mt-2" />
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Used Hits</CardTitle>
                <h2>{getHits('used')}</h2>
                <Progress value={5} color="success" className="mt-2" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">API Usage Over Time</CardTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={apiUsageData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="calls" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Quick Actions</CardTitle>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">
                    <Key size={20} className="me-2" />
                    <Link style={{color: 'inherit'}} to="/dashboard/api_keyset">View API Key</Link>
                  </button>
                  <button className="btn btn-secondary">
                    <FileText size={20} className="me-2" />
                    <Link style={{color: 'inherit'}} to="/api/docs">API Documentation</Link>
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <CardTitle tag="h5">Recent Billing</CardTitle>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Product</th>
                  <th>Bill Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {billingData?.data?.map((item: any, i: number) => {
                  const billDate = new Date(item?.created_at)
                  const plan = plansData?.data?.find((plan: any) => plan.id === item.plan_id)
                  const validityDays = plan ? parseInt(plan.validity, 10) : 0
                  const dueDate = new Date(billDate.getTime() + validityDays * 24 * 60 * 60 * 1000)
                  const invoiceData = {
                    invoice: `PSA-001-${item?.created_at?.split("T")[0]}`,
                    product: "Cricket",
                    bill_date: item?.created_at?.split("T")[0],
                    due_date: dueDate.toISOString().split("T")[0],
                    price: item?.amount,
                    tax: item?.amount * (18 / 100),
                    amount: item?.amount + item?.amount * (18 / 100),
                    plan: plan
                  }

                  return (
                    <tr key={i}>
                      <td>{invoiceData.invoice}</td>
                      <td>{invoiceData.product}</td>
                      <td>{invoiceData.bill_date}</td>
                      <td>{invoiceData.due_date}</td>
                      <td>₹{invoiceData.amount.toFixed(2)}</td>
                      <td>
                        <Eye
                          id={`icon-view-${i}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleViewInvoice(invoiceData)}
                        />
                        <Tooltip
                          placement="top"
                          isOpen={tooltipOpen[`icon-view-${i}`]}
                          target={`icon-view-${i}`}
                          toggle={() => toggleTooltip(`icon-view-${i}`)}
                        >
                          View invoice
                        </Tooltip>
                        <Download
                          id={`icon-pdf-${i}`}
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          onClick={() => handleDownloadPdf(invoiceData)}
                        />
                        <Tooltip
                          placement="top"
                          isOpen={tooltipOpen[`icon-pdf-${i}`]}
                          target={`icon-pdf-${i}`}
                          toggle={() => toggleTooltip(`icon-pdf-${i}`)}
                        >
                          Download invoice
                        </Tooltip>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card className="mt-4">
          <CardBody>
            <CardTitle tag="h5">Log Events</CardTitle>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {logEventsData?.data?.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item?.email}</td>
                    <td>{item?.created_at.split("T")[0]}</td>
                    <td>{formatTime(item?.created_at)}</td>
                    <td>{item?.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>

      <div style={{ display: 'none' }}>
        <div ref={invoiceContainerRef}>
          <InvoiceTwo data={invoiceData} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Invoice</ModalHeader>
        <ModalBody>
          <InvoiceTwo data={invoiceData} />
        </ModalBody>
        <div className="text-end p-3">
          <Button color="primary" onClick={() => handleDownloadPdf(invoiceData)}>Download PDF</Button>
        </div>
      </Modal>
    </div>
  )
}

export default EnhancedDashboard