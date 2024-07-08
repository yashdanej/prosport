import { Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Btn } from '../../../../../AbstractElements'
import { AboutMe, Address, City, Company, Country, EditProfile, Emailaddress, FirstName, LastName, PostalCode, UpdateProfile, Username } from '../../../../../utils/Constant'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'

const EditProfileForm = () => {
  return (
    <Col xl="8" >
      <Form>
        <Card>
            <CardHeaderCommon title={EditProfile} tagClass={"card-title mb-0"} />
            <CardBody>
                <Row>
                    <Col sm="6" md="6" >
                        <FormGroup>
                            <Label >{FirstName}</Label>
                            <Input type="text" placeholder="Company" />
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="6" >
                        <FormGroup>
                            <Label >{LastName}</Label>
                            <Input type="text" placeholder="Last Name" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="12" >
                        <FormGroup>
                            <Label >{Emailaddress}</Label>
                            <Input type="email" placeholder="Email" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="12" >
                        <FormGroup>
                            <Label >Phone</Label>
                            <Input type="number" placeholder="Phone" />
                        </FormGroup>
                    </Col>
                    {/* <Col md="12">
                        <FormGroup>
                            <Label >{Address}</Label>
                            <Input type="text" placeholder="Home Address" />
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="4" >
                        <FormGroup>
                            <Label >{City}</Label>
                            <Input type="text" placeholder="City" />
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="3" >
                        <FormGroup>
                            <Label >{PostalCode}</Label>
                            <Input type="number" placeholder="ZIP Code" />
                        </FormGroup>
                    </Col>
                    <Col md="5">
                        <FormGroup>
                            <Label>{Country}</Label>
                            <Input type='select' className="btn-square form-select">
                            <option>{'Select'}</option>
                            <option>{'Germany'}</option>
                            <option>{'Canada'}</option>
                            <option>{'Usa'}</option>
                            <option>{'Aus'}</option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    {/* <Col md="12">
                        <Label>{AboutMe}</Label>
                        <textarea className="form-control" rows={3} placeholder="Enter About your description" />
                    </Col> */}
                </Row>
            </CardBody>
            <CardFooter className="text-end">
                <Btn color="primary" type="submit">{UpdateProfile}</Btn>
            </CardFooter>
        </Card>
      </Form>
      <Form>
        <Card>
            <CardHeaderCommon title="Session" tagClass={"card-title mb-0"} />
            <CardBody>
                <p>This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
            </CardBody>
            {/* <CardFooter className="text-end">
                <Btn color="primary" type="submit">{UpdateProfile}</Btn>
            </CardFooter> */}
        </Card>
      </Form>
    </Col>
  )
}

export default EditProfileForm