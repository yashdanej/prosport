import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { DesignerTitle, Href } from '../../../../../utils/Constant'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../ReduxToolkit/Store';

const ProfileName = () => {
  const maUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin?.accountUsers.view);
  return (
    <>
      <Col sm="12" xl="4" className="order-sm-0 order-xl-1">
        <div className="user-designation tour-email">
          <div className="title">
              {maUsersData?.data?.[0]?.name} {maUsersData?.data?.[0]?.lastname}
          </div>
          <div className="desc">{maUsersData?.data?.[0]?.company_domain}</div>
        </div>
      </Col>
    </>
  )
}

export default ProfileName