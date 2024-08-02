import { Col, Container, Row } from 'reactstrap'
import ShopContent from './ShopContent'

const ShopContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <ShopContent/>
          {/* <SimplePricingCard /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default ShopContainer