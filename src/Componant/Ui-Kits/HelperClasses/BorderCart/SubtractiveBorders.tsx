import { Col } from 'reactstrap'
import { H5 } from '../../../../AbstractElements'
import { SubtractiveBorder } from '../../../../utils/Constant'
import { subtractiveData } from '../../../../Data/Ui-Kits/HelperClasses/HelperClassesData'

const SubtractiveBorders = () => {
  return (
    <Col xl="4" sm="6">
      <div className="border-wrapper h-100 border">
        <H5 className="f-w-600 mb-3">{SubtractiveBorder}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box bg-light border border-0"> </div>.border-0
        </div>
        {subtractiveData.map((item ,index) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-box bg-light border ${item}`}> </div>.{item}
          </div>
        ))}
      </div>
    </Col>
  )
}

export default SubtractiveBorders