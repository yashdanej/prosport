import React from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import { User, Lock, Bell } from 'lucide-react';

import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import Industry from './Industry';
import ChangeLog from './ChangeLog';

const SettingsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/dashboard/settings') {
      navigate('/dashboard/settings/profile');
    }
  }, [location, navigate]);

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        <h1 className="mb-4">Settings</h1>
        <Row>
          <Col md={3}>
            <Nav vertical>
              <NavItem>
                <NavLink to="/dashboard/settings/profile" className="nav-link">
                  <User size={18} className="me-2" />
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/settings/security" className="nav-link">
                  <Lock size={18} className="me-2" />
                  Security
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/settings/industry" className="nav-link">
                  <Lock size={18} className="me-2" />
                  Industry
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/settings/change-log" className="nav-link">
                  <Lock size={18} className="me-2" />
                  Change Log
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/settings/notifications" className="nav-link">
                  <Bell size={18} className="me-2" />
                  Notification
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md={9}>
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