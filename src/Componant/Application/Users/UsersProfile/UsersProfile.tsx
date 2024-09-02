import { Container, Row } from 'reactstrap'
import Profile from './Profile/Profile'
import MarkProfile from './MarkProfile/MarkProfile'
import Profile2 from './Profile2/Profile2'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import DetailImage from './DetailImage/DetailImage'
import RecentDevice from '../../../../Pages/Dashboard/Account/RecentDevice'

const UsersProfileContainer = () => {
  return (
    <Container fluid>
      <div className="user-profile">
        <Row>
          <Profile />
          <RecentDevice/>
          {/* <MarkProfile />
          <Profile2 />
          <ProfileDetails />
          <DetailImage /> */}
        </Row>
      </div>
    </Container>
  )
}

export default UsersProfileContainer