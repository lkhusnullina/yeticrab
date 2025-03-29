import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@gravity-ui/uikit";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import App from "./App";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme="light">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();