import { Col } from 'reactstrap'
import { H5 } from '../../../../AbstractElements'
import { LightBackground } from '../../../../utils/Constant'
import { lightBackgroundData } from '../../../../Data/Ui-Kits/HelperClasses/HelperClassesData'

const LightBackgrounds = () => {
  return (
    <Col xl="4" sm="6">
      <div className="border-wrapper h-100 border">
        <H5 className="f-w-600 mb-3">{LightBackground}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box alert-light-primary"> </div>.alert-light-primary
        </div>
        {lightBackgroundData.map((item, index) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-box ${item}`}> </div>.{item}
          </div>
        ))}
      </div>
    </Col>
  )
}

export default LightBackgrounds