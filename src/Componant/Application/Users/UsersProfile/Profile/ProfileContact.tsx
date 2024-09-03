import { Col, Row } from 'reactstrap'
import { H6, Progressbar } from '../../../../../AbstractElements'
import { userProfileData } from '../../../../../Data/Application/Users/UsersProfile/UsersProfile'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../ReduxToolkit/Store';

const ProfileContact = () => {
  const maUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.view);
  return (
    <Col sm="6" xl="4" className="order-sm-2 order-xl-2">
      <Row className="g-3">
        {userProfileData.slice(2,3).map((data,i)=>(
          <>
            <Col md="6" className="mt-0 mt-sm-3" key={i}>
              <div className="ttl-info text-start">
                <H6 className='mb-2'>
                  Complete Your Profile ({maUsersData?.data?.[1]?.profileCompletion}%)
                </H6>
                <Progressbar animated={true} color={'success'} value={maUsersData?.data?.[1]?.profileCompletion} style={{ height: '5px' }} />
              </div>
            </Col>
            <Col></Col>
          </>
        ))}
      </Row>
    </Col>
  )
}

export default ProfileContact