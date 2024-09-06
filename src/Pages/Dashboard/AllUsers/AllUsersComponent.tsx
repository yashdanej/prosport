import React, { useEffect } from 'react'
import { AppDispatch } from '../../../ReduxToolkit/Store';
import { useDispatch } from 'react-redux';
import { getMasterDashboardAllUsersData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import StatusApiLogTable from './AllUsersTable';
import AllUsersTopBar from './AllUsersTopBar';
import AllUsersTable from './AllUsersTable';

const AllUsersComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchMasterDashboardAllUsersData = async () => {
    try {
      await dispatch(getMasterDashboardAllUsersData()).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardAllUsersData", error);
    }
  };

  useEffect(() => {
    fetchMasterDashboardAllUsersData();
  }, [dispatch]);
  return (
    <div>
      <AllUsersTopBar/>
      <AllUsersTable fetchMasterDashboardAllUsersData={fetchMasterDashboardAllUsersData} />
    </div>
  )
}

export default AllUsersComponent
