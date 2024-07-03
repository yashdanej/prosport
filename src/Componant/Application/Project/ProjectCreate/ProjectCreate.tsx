import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CreateNewProjectForm from './CreateNewProjectForm'

const ProjectCreateContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateNewProjectForm />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProjectCreateContainer