import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { HelperCards } from '../../../../utils/Constant'
import { helperData } from '../../../../Data/Ui-Kits/Dropdown/Dropdown'
import HelperCart from './HelperCart'
import WarningCard from './WarningCard'
import AlertCard from './AlertCard'

const HelperCard = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={HelperCards} span={helperData} />
        <CardBody className="dropdown-basic m-0">
          <div className="common-flex">
            <HelperCart />
            <WarningCard />
            <AlertCard />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HelperCard