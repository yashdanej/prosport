import { Col, Container, Row } from 'reactstrap'
import CricketContent from './CricketContent'

const CricketContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <CricketContent/>
          {/* <SimplePricingCard /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default CricketContainer