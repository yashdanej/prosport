import { Card, Col, Container, Row } from 'reactstrap'
import BecomeMember from './RefferContent'
import RefferContent from './RefferContent'
import _RefferContent from './_RefferContent'
import RefferSideBar from './RefferSideBar'
import RefferOther from './RefferOther'
import TopRefferedUsers from './TopRefferedUsers'

const RefferContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <RefferContent />
          {/* <SimplePricingCard /> */}
        </Col>
      </Row>
      {/* <Row>
        <RefferSideBar />
        <Col xl="9" md="12" className="box-col-12">
          <div className="file-content">
            <Card>
              <_RefferContent />
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <RefferOther/>
      </Row> */}
      <Row>
        <TopRefferedUsers/>
      </Row>
    </Container>
  )
}

export default RefferContainer