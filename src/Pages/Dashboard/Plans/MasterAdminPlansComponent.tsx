import React, { useEffect } from 'react'
import { AppDispatch } from '../../../ReduxToolkit/Store';
import { useDispatch } from 'react-redux';
import { getMasterDashboardAllUsersData, getMasterDashboardPlansData, getMasterDashboardUsersInvoicesData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import StatusApiLogTable from './MasterAdminPlansTable';
import AllUsersTopBar from './MasterAdminPlansTopBar';
import AllUsersTable from './MasterAdminPlansTable';
import UsersInvoiceTopBar from './MasterAdminPlansTopBar';
import UsersInvoiceTable from './MasterAdminPlansTable';
import MasterAdminPlansTopBar from './MasterAdminPlansTopBar';
import MasterAdminPlansTable from './MasterAdminPlansTable';

const MasterAdminPlansComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchMasterDashboardPlansData = async () => {
    try {
      await dispatch(getMasterDashboardPlansData()).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardPlansData", error);
    }
  };

  useEffect(() => {
    fetchMasterDashboardPlansData();
  }, [dispatch]);
  return (
    <div>
      <MasterAdminPlansTopBar/>
      <MasterAdminPlansTable from='Plan' />
    </div>
  )
}

export default MasterAdminPlansComponent
