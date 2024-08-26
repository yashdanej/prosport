import React, { useEffect } from 'react'
import StatusTopBar from './StatusTopBar'
import { AppDispatch } from '../../../ReduxToolkit/Store';
import { useDispatch } from 'react-redux';
import { getMasterDashboardApiLogData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import StatusApiLogTable from './StatusApiLogTable';

const StatusComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchMasterDashboardApiLogsData = async () => {
    try {
      await dispatch(getMasterDashboardApiLogData()).unwrap();
    } catch (error) {
      console.log("error from getMasterDashboardApiLogData", error);
    }
  };

  useEffect(() => {
    fetchMasterDashboardApiLogsData();
  }, [dispatch]);
  return (
    <div>
      <StatusTopBar/>
      <StatusApiLogTable/>
    </div>
  )
}

export default StatusComponent
