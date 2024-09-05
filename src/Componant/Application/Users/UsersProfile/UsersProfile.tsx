import { Container, Row } from 'reactstrap'
import Profile from './Profile/Profile'
import MarkProfile from './MarkProfile/MarkProfile'
import Profile2 from './Profile2/Profile2'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import DetailImage from './DetailImage/DetailImage'
import RecentDevice from '../../../../Pages/Dashboard/Account/RecentDevice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../ReduxToolkit/Store'
import { getMasterAdminUsersData } from '../../../../ReduxToolkit/Reducers/Change/ApiLogsSlice'
import { useLocation } from 'react-router-dom'
import { P } from '../../../../AbstractElements'
import BillingStatement from '../../../../Pages/Dashboard/Account/Billing/BillingStatement'
import Referrals from '../../../../Pages/Dashboard/Account/Referrals/Referrals'
import ApiKeyMA from '../../../../Pages/Dashboard/Account/ApiKeys/ApiKeyMA'

const UsersProfileContainer = () => {
  const [active, setActive] = useState('billing-statements');
  const activeTab = () => {
    if(active === 'security'){
      return <RecentDevice/>
    }else if(active === 'billing-statements'){
      return <BillingStatement/>
    }else if (active === 'referrals'){
      return <Referrals/>
    }else if(active === 'api_keys'){
      return <ApiKeyMA/>
    }else{
      return <P>No content found</P>
    }
  }
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const dispatch = useDispatch<AppDispatch>();
  const fetchAccountUsersData = async () => {
    try {
      console.log("fetchAccountUsersData in");
      await dispatch(getMasterAdminUsersData(+id)).unwrap();
    } catch (error) {
      console.log("error from fetchAccountUsersData", error);
    }
  }
  useEffect(() => {
    fetchAccountUsersData();
  }, [dispatch]);
  return (
    <Container fluid>
      <div className="user-profile">
        <Row>
          <Profile active={active} setActive={setActive} />
          {activeTab()}
        </Row>
      </div>
    </Container>
  )
}

export default UsersProfileContainer