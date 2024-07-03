import { Card, CardBody, CardHeader, Col } from 'reactstrap'
import { ActivityLogHeading } from '../../../../../utils/Constant'
import MyActivity from './MyActivity'
import { H5 } from '../../../../../AbstractElements'

const ActivityLog = () => {
  return (
    <Col sm="12" className='activity-log-main'>
      <Card>
        <CardHeader >
            <H5>{ActivityLogHeading}</H5>
        </CardHeader>
        <CardBody>
          <div className="activity-log">
            <MyActivity Heading="Today" />
            <MyActivity Heading="25 December" />
            <MyActivity Heading="8 september" />
            <MyActivity Heading="6 June" />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ActivityLog