import { Col, Container, Row } from 'reactstrap'
import ApiKey from './ApiKey'

const ApiKeysetContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <ApiKey/>
          {/* <SimplePricingCard /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default ApiKeysetContainer