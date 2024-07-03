import { Provider } from "react-redux";
import RouterData from "./Routes";
import { ToastContainer } from "react-toastify";
import Store from "./ReduxToolkit/Store";

const App = () => {
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
