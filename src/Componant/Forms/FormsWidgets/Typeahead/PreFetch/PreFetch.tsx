import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Typeahead } from 'react-bootstrap-typeahead'
import { countryDataList, preFetchData } from '../../../../../Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { PreFetchHeading } from '../../../../../utils/Constant'

const PreFetch = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CardHeaderCommon title={PreFetchHeading} span={preFetchData} />
        <CardBody>
          <div id="the-basics">
            <Form className="theme-form">
              <div>
                <Typeahead options={countryDataList} placeholder="Countries" id="PreFetch"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PreFetch