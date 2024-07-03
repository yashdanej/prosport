import { Col, Row } from 'reactstrap'
import { H5, LI, UL } from '../../../../../AbstractElements'
import { ShareIt } from '../../../../../utils/Constant'
import { Link } from 'react-router-dom'
import { productSocial } from '../../../../../Data/Application/Ecommerce/ProductPage'

const ProductShare = () => {
  return (
    <Row>
      <Col md="4">
        <H5 className="f-w-600 product-title">{ShareIt}</H5>
      </Col>
      <Col md="8">
        <div className="product-icon">
          <UL className="product-social simple-list flex-row">
            {productSocial.map((data,index) => (
              <LI className="d-inline-block" key={index}>
                <Link to={data.link} target="_blank">
                  <i className={`fa fa-${data.iconName}`} />
                </Link>
              </LI>
            ))}
          </UL>
        </div>
      </Col>
    </Row>
  )
}

export default ProductShare