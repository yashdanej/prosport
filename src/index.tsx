import "./index.scss";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import { Provider } from "react-redux";
import './i18n'
import Store from "./ReduxToolkit/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
 );

root.render(
<Provider store={Store}>
    <App />
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
