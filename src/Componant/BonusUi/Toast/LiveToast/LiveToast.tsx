import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { LiveToasts } from '../../../../utils/Constant'
import { liveToastData } from '../../../../Data/BonusUi/Toast/Toast'
import TopRightToast from './TopRightToast/TopRightToast'
import BottomRightToast from './BottomRightToast/BottomRightToast'
import TopLeftToast from './TopLeftToast/TopLeftToast'
import BottomLeftToast from './BottomLeftToast/BottomLeftToast'

const LiveToast = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={LiveToasts} span={liveToastData} />
        <CardBody className="position-relative common-flex">
          <TopRightToast />
          <BottomRightToast txt="Your time over after 5 minute." isOpen={false} />
          <TopLeftToast txt="Your time over after 5 minute." isOpen={false} />
          <BottomLeftToast />
        </CardBody>
      </Card>
    </Col>
  )
}

export default LiveToast