import { Card, CardBody, Col, Row } from 'reactstrap'
import { articleDataThird } from '../../../../Data/Miscellaneous/Faq'
import { H5, P } from '../../../../AbstractElements'

const ArticleVideo3 = () => {
  return (
    <Col xl="4">
      <Row>
        {articleDataThird.map((item, i) => (
          <Col xl="12" md="6" key={i}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  {item.iconClass}
                  <div className="flex-grow-1">
                    <H5 className="pb-2 f-w-600">{item.title}</H5>
                    <P>{item.description}</P>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

export default ArticleVideo3