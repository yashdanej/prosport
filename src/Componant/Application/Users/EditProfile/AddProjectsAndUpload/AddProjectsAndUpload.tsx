import { Card, Table, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Btn } from '../../../../../AbstractElements'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { AddprojectAndUpload, Date, Price, ProjectName, Status } from '../../../../../utils/Constant'
import AddProjectsAndUploadTableBody from './AddProjectsAndUploadTableBody'

const AddProjectsAndUpload = () => {
  return (
    <>
    <Col md="12">
      {/* <Form>
        <Card>
            <CardHeaderCommon title="Change Password" tagClass={"card-title mb-0"} />
            <CardBody>
                <Row>
                    <Col sm="6" md="6" >
                        <FormGroup>
                            <Label >Old Password</Label>
                            <Input type="text" placeholder="Old Password" />
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="6" >
                        <FormGroup>
                            <Label >New Password</Label>
                            <Input type="text" placeholder="New Password" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="12" >
                        <FormGroup>
                            <Label >Confirm Password</Label>
                            <Input type="email" placeholder="Confirm Password" />
                        </FormGroup>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className="text-end">
                <Btn color="primary" type="submit">Save</Btn>
            </CardFooter>
        </Card>
      </Form> */}
      <Card>
        <CardHeaderCommon title="Notification" tagClass="card-title mb-0" />
        <div className="table-responsive add-project theme-scrollbar">
          <p className='px-4 pt-2'>Choose how you receive notifications. These notification settings apply to the things you’re watching.</p>
          <Table className="card-table table-vcenter text-nowrap">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Email</th>
              </tr>
            </thead>
            <AddProjectsAndUploadTableBody />
          </Table>
        </div>
      </Card>
    </Col>
    <Form>
      <Card>
        <CardHeaderCommon title="Session" tagClass={"card-title mb-0"} />
        <CardBody>
          <p>This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
        </CardBody>
      </Card>
    </Form>
  </>
  )
}

export default AddProjectsAndUpload