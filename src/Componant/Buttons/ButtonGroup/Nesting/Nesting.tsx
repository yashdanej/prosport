import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { NestingButton } from '../../../../utils/Constant'
import { nestingData } from '../../../../Data/Buttons/ButtonGroup'
import StaticNesting from './StaticNesting'
import DynamicNesting from './DynamicNesting'

const Nesting = () => {
  return (
    <>
      <Col lg="6">
        <Card className="height-equal">
          <CardHeaderCommon title={NestingButton} span={nestingData} />
          <CardBody className="btn-group-wrapper">
            <StaticNesting />
            <DynamicNesting />
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Nesting