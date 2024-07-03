import { Container, Row } from 'reactstrap'
import EditMyProfile from './EditMyProfile/EditMyProfile'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import AddProjectsAndUpload from './AddProjectsAndUpload/AddProjectsAndUpload'

const EditProfileContainer = () => {
  return (
    <Container fluid>
      <div className="edit-profile">
        <Row>
          <EditMyProfile />
          <EditProfileForm />
          <AddProjectsAndUpload />
        </Row>
      </div>
    </Container>
  )
}

export default EditProfileContainer