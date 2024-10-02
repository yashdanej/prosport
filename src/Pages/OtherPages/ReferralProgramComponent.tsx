'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardBody, Button, Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import { Copy, RefreshCw, Users, Share2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../ReduxToolkit/Store'
import { getRefferer } from '../../ReduxToolkit/Reducers/Change/AuthSlice'
import { getCommission } from '../../ReduxToolkit/Reducers/Change/Subscribe'
import { FaRupeeSign } from 'react-icons/fa'
import { convertToIST, FRONTEND_URL } from '../../Utils'

interface CommissionData {
  created_at: string
  commission: number
  referred_id: string
}

export default function ReferralProgramComponent() {
  const [referralModalOpen, setReferralModalOpen] = useState(false)
  const [copiedAlert, setCopiedAlert] = useState(false)
  const [copieLink, setCopyLink] = useState("")

  const commissionData = useSelector((state: RootState) => state.subscribe.commission)
  const commissionEarn = useSelector((state: RootState) => state.subscribe.commission?.data)
  const reffererData = useSelector((state: RootState) => state.auth.refferer)
  const usersData = useSelector((state: RootState) => state.auth.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getRefferer())
    dispatch(getCommission())
  }, [dispatch])

  const userData = typeof window !== 'undefined' ? localStorage.getItem("login-user") : null
  const parsedUserData = userData ? JSON.parse(userData) : null

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedAlert(true)
    setTimeout(() => setCopiedAlert(false), 2000)
  }

  const generateReferralLink = (code: string) => {
    return `${FRONTEND_URL}/authentication/register_simple/${code}`
  }

  const handleLinkCopied = (link: string) => {
    navigator.clipboard.writeText(generateReferralLink(link))
    setCopyLink("Link copied successfully")
    setTimeout(() => {
      setCopyLink("")
    }, 2000)
  }

  // Process commission data for the chart
  const processCommissionData = () => {
    if (!commissionEarn?.data) return { labels: [], datasets: [] }

    const aggregatedData = commissionEarn.data.reduce((acc: { [key: string]: number }, item: CommissionData) => {
      const date = convertToIST(item.created_at).split(',')[0]
      acc[date] = (acc[date] || 0) + item.commission
      return acc
    }, {})

    const sortedDates = Object.keys(aggregatedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    const amounts = sortedDates.map(date => aggregatedData[date])

    return {
      labels: sortedDates,
      datasets: [{
        label: 'Earnings',
        data: amounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  }

  const earningChartData = processCommissionData()

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        <p>Track and find all the details about our referral program, your stats and revenues.</p>

        <Row className="mb-4">
          <Col md={4}>
            <Card>
              <CardBody>
                <h5><FaRupeeSign size={20} className="me-2" />Earning</h5>
                <h2><FaRupeeSign size={20} className="me-2" />{commissionData.data?.totalCommission || 0}</h2>
                <Button color="primary" size="sm" onClick={() => setReferralModalOpen(true)}>View Details</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <h5><Users size={20} className="me-2" />References</h5>
                <h2>{reffererData.data?.length || 0}</h2>
                <Button color="info" size="sm" onClick={() => {
                  dispatch(getRefferer())
                  dispatch(getCommission())
                }}><RefreshCw size={16} /></Button>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <h5><Share2 size={20} className="me-2" />Referral Code</h5>
                <h2>{parsedUserData?.user?.reffer_code}</h2>
                <Button color="success" size="sm" onClick={() => copyReferralCode(parsedUserData?.user?.reffer_code)}>Copy Code</Button>
                {copiedAlert && <Alert color="success" className="mt-2">Copied!</Alert>}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card className="mb-4">
          <CardBody>
            <h3>Earnings Over Time</h3>
            {earningChartData.labels.length > 0 ? (
              <Line data={earningChartData} />
            ) : (
              <p>No earning data available</p>
            )}
          </CardBody>
        </Card>

        <h2 className="mb-3">Top Referred Users</h2>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Referred</th>
              <th>Commission Earned ($)</th>
              <th>Commission (%)</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {reffererData?.data?.map((row: any, index: number) => (
              <tr key={index}>
                <td>{`PSA00${index+1}`}</td>
                <td>{usersData?.data?.find((user: any) => user.id === row?.referred_id)?.email}</td>
                <td>{commissionEarn?.data?.find((user: any) => user.referred_id === row.referred_id)?.commission || 0}</td>
                <td>{commissionEarn?.data?.find((user: any) => user.referred_id === row.referred_id) ? "5" : 0}%</td>
                <td>{convertToIST((row.created_at)).split(",")[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={referralModalOpen} toggle={() => setReferralModalOpen(!referralModalOpen)}>
          <ModalHeader toggle={() => setReferralModalOpen(!referralModalOpen)}>
            Referral Details
          </ModalHeader>
          <ModalBody>
            <h4>Your Referral Link</h4>
            <Input value={generateReferralLink(parsedUserData?.user?.reffer_code)} readOnly />
            <Button color="primary" className="mt-2" onClick={() => handleLinkCopied(parsedUserData?.user?.reffer_code)}>
              Copy Link
            </Button>
            {copieLink !== "" && <Alert color="success" className="mt-2">{copieLink}</Alert>}
            <h4 className="mt-4">How It Works</h4>
            <ol>
              <li>Share your unique referral link with friends or colleagues</li>
              <li>When they sign up using your link, they get a 10% discount on their first month</li>
              <li>You earn a 5% commission on their subscription for the first year</li>
            </ol>
            <Alert color="info">
              The more people you refer, the more you can earn!
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setReferralModalOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  )
}