import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { AutoPlayVariants } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { autoPlayData, autoPlayDataList } from '../../../../Data/BonusUi/OwlCarousel'

const AutoPlayVariant = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={AutoPlayVariants} span={autoPlayData} />
        <CardBody>
          <CommonCarousel data={autoPlayDataList} indecators interval="1500"/>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AutoPlayVariant