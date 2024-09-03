import { Col, Row } from 'reactstrap'
import { userProfileData } from '../../../../../Data/Application/Users/UsersProfile/UsersProfile'
import { H6 } from '../../../../../AbstractElements'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../ReduxToolkit/Store';

const ProfileMail = () => {
  const maUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.view);
  return (
    <Col sm="6" xl="4" className="order-sm-1 order-xl-0">
      <Row className="g-3">
        {userProfileData.slice(0,1).map((data,i)=>(
          <>
            <Col md="6"></Col>
            <Col md="6" key={i}>
              <div className="ttl-info text-start">
                <H6>
                  <i className={`fa fa-${data.icon}`} /> {data.title}
                </H6>
                <span>{maUsersData?.data?.[0]?.email}</span>
              </div>
            </Col>
          </>
        ))}
      </Row>
    </Col>
  )
}

export default ProfileMail