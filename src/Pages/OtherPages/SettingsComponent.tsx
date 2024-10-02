import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import { User, Lock, Bell } from 'lucide-react';

import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import Industry from './Industry';
import ChangeLog from './ChangeLog';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../ReduxToolkit/Store';
import { getLoggedUserProfile } from '../../ReduxToolkit/Reducers/Change/ProfileSlice';

const SettingsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/dashboard/settings') {
      navigate('/dashboard/settings/profile');
    }
  }, [location, navigate]);

  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = () => {
    dispatch(getLoggedUserProfile());
  }
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        {/* <h1 className="mb-4">Settings</h1> */}
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="industry" element={<Industry />} />
              <Route path="change-log" element={<ChangeLog />} />
              <Route path="notifications" element={<NotificationSettings />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SettingsComponent;