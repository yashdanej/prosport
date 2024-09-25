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
        </Col>
      </Row>
      <Row>
        <TopRefferedUsers/>
      </Row>
    </Container>
  )
}

export default RefferContainer