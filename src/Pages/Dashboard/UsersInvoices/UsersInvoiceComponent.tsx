import React, { useEffect } from 'react'
import { AppDispatch } from '../../../ReduxToolkit/Store';
import { useDispatch } from 'react-redux';
import { getMasterDashboardAllUsersData, getMasterDashboardUsersInvoicesData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import StatusApiLogTable from './UsersInvoiceTable';
import AllUsersTopBar from './UsersInvoiceTopBar';
import AllUsersTable from './UsersInvoiceTable';
import UsersInvoiceTopBar from './UsersInvoiceTopBar';
import UsersInvoiceTable from './UsersInvoiceTable';

const UsersInvoiceComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchMasterDashboardUsersInvoiceData = async () => {
    try {
      await dispatch(getMasterDashboardUsersInvoicesData()).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardUsersInvoicesData", error);
    }
  };

  useEffect(() => {
    fetchMasterDashboardUsersInvoiceData();
  }, [dispatch]);
  return (
    <div>
      <UsersInvoiceTopBar/>
      <UsersInvoiceTable fetchMasterDashboardUsersInvoiceData={fetchMasterDashboardUsersInvoiceData} />
    </div>
  )
}

export default UsersInvoiceComponent
