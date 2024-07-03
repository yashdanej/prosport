import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DefaultRadios } from '../../../../../utils/Constant'
import CustomRadios from './CustomRadios'
import { defaultRadioData, defaultRadioDataList } from '../../../../../Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import { H6 } from '../../../../../AbstractElements'

const DefaultRadio = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={DefaultRadios} span={defaultRadioData} />
        <CardBody>
          <Row className="g-3">
            <CustomRadios />
            {defaultRadioDataList.map(({ title, span, className }, index) => (
              <Col sm="6" xl="4" key={index}>
                <div className="card-wrapper border rounded-3 checkbox-checked">
                  <H6 className="sub-title">{title}</H6>
                  {span.map(({ id, label, defaultChecked, disabled }, index) => (
                    <div className={`form-check ${className}`} key={index}>
                      <Input id={id} type="radio" name="flexRadioDefault" defaultChecked={defaultChecked} disabled={disabled} />
                      <Label check for={id}>
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DefaultRadio