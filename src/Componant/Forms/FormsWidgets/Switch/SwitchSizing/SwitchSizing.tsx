import { Card, CardBody, Col, Input, Label } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SwitchSizingHeading } from '../../../../../utils/Constant'
import { switchSizingData, switchSizingDataList } from '../../../../../Data/Forms/FormsWidgets/Switch/Switch'

const SwitchSizing = () => {
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={SwitchSizingHeading} span={switchSizingData} />
        <CardBody className="common-flex switch-wrapper">
          {switchSizingDataList.map(({ label, flexClass, defaultChecked, disabled }, index) => (
            <div className="d-flex" key={index}>
              <Label className="col-form-label m-r-10" check>{label}</Label>
              <div className={`flex-grow-1 text-end ${flexClass}`}>
                <Label className="switch">
                  <Input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} />
                  <span className="switch-state"></span>
                </Label>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default SwitchSizing