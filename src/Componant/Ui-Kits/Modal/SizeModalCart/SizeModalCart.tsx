import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SizesModal } from '../../../../utils/Constant'
import { sizeData } from '../../../../Data/Ui-Kits/Modal/Modal'
import FullScreenModal from './FullScreenModal/FullScreenModal'
import ExtraLargeModal from './ExtraLargeModal/ExtraLargeModal'
import LargeModal from './LargeModal/LargeModal'
import SmallModal from './SmallModal/SmallModal'

const SizeModalCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={SizesModal} span={sizeData} />
        <CardBody className="badge-spacing">
          <FullScreenModal />
          <ExtraLargeModal />
          <LargeModal />
          <SmallModal />
        </CardBody>
      </Card>
    </Col>
  )
}

export default SizeModalCart