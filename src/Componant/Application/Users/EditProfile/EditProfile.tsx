import { Container, Row } from 'reactstrap'
import EditMyProfile from './EditMyProfile/EditMyProfile'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import AddProjectsAndUpload from './AddProjectsAndUpload/AddProjectsAndUpload'
import { getLoggedUserProfile } from '../../../../ReduxToolkit/Reducers/Change/ProfileSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../ReduxToolkit/Store'
import { useEffect } from 'react'

const EditProfileContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = () => {
    dispatch(getLoggedUserProfile());
  }
  
  useEffect(() => {
    fetchUser();
  }, []);
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