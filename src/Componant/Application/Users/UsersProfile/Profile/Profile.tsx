import { Card, Col } from 'reactstrap'
import { Image } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'
import ProfileDetail from './ProfileDetail'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../ReduxToolkit/Store'

const Profile = ({active, setActive}: any) => {
  const maUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.view);
  return (
    <Col sm="12">
      <Card className="hovercard text-center">
        <div style={{ 
          height: '150px', 
          background: 'linear-gradient(to bottom right, black, red)' 
        }} />
        <div className="user-image">
          <div className="avatar">
            <Image style={{objectFit: 'cover', width: '400px', height: '400px'}} src={maUsersData?.data?.[0]?.image || dynamicImage("user/7.jpg")} className="step1" alt="profile"/>
          </div>
          {/* <div className="icon-wrapper">
            <i className="icofont icofont-pencil-alt-5 step2"/>
          </div> */}
        </div>
        <div className='mt-5'>
          <ProfileDetail active={active} setActive={setActive} />
        </div>
      </Card>
    </Col>
  )
}

export default Profile