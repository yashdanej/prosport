import { Card, CardBody, Col, Row } from 'reactstrap'
import NestingCardBody from './NestingCardBody'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Nesting } from '../../../../utils/Constant'
import { nestingData } from '../../../../Data/Ui-Kits/Grid/GridData'

const NestingCart = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={Nesting} span={nestingData} />
        <CardBody className="grid-showcase">
          <Row className="g-3">
            <NestingCardBody />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default NestingCart