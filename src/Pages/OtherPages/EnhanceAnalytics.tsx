import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { TrendingUp } from 'lucide-react'
import { AppDispatch, RootState } from '../../ReduxToolkit/Store'
import { getApiKeys } from '../../ReduxToolkit/Reducers/Change/Subscribe'
import { getAnalyticsData } from '../../ReduxToolkit/Reducers/Change/AnalyticsSlice'

const AnalyticsCard = ({ title, value }: { title: string; value: number | string }) => (
  <Card className="mb-3 shadow-sm">
    <CardBody className="d-flex justify-content-between align-items-center">
      <div>
        <h6 className="mb-0 text-muted">{title}</h6>
        <h3 className="mb-0">{value}</h3>
      </div>
      <div className="bg-danger rounded-circle p-3">
        <TrendingUp size={24} color="white" />
      </div>
    </CardBody>
  </Card>
)

const EnhancedAnalytics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const analyticsData = useSelector((state: RootState) => state.analytics.analytics)

  useEffect(() => {
    dispatch(getAnalyticsData())
  }, [dispatch])

  const analyticsCardData = analyticsData?.data?.map((item: any) => ({
      title: item.name,
      value: item.count,
    })) || []

  return (
    <div className='page-body'>
      <Container fluid className="p-4 bg-light">
        {/* <h1 className="mb-4">Analytics</h1> */}
        <Row>
          {analyticsCardData.map((item: any, index: any) => (
            <Col key={index} md={3} className="mb-3">
              <AnalyticsCard title={item.title} value={item.value} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default EnhancedAnalytics