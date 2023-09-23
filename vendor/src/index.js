import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Toggl_provider from "./Component/Toggl_provider";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toggl_provider>
      <App />
      <NotificationContainer />
      <ToastContainer />
    </Toggl_provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
