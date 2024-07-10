import { Provider, useDispatch, useSelector } from "react-redux";
import RouterData from "./Routes";
import { ToastContainer } from "react-toastify";
import Store, { AppDispatch, RootState } from "./ReduxToolkit/Store";
import { useEffect } from "react";
import { getAllUsers } from "./ReduxToolkit/Reducers/Change/AuthSlice";
import { getSubscribe } from "./ReduxToolkit/Reducers/Change/Subscribe";
import { getLoggedUserProfile } from "./ReduxToolkit/Reducers/Change/ProfileSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchRefferer = () => {
    dispatch(getAllUsers());
  }
  const fetchPlans = () => {
    dispatch(getSubscribe());
  }

  useEffect(() => {
    fetchRefferer();
    fetchPlans();
  }, [dispatch]);
  
  return (
    <>
      <Provider store={Store} >
        <RouterData />
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
