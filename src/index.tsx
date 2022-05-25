import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { IntlProvider } from "react-intl";

import en from "./i18n/en.json";
import ar from "./i18n/ar.json";
import fr from "./i18n/fr.json";

interface i18n {
  en: Record<string, string>;
  ar: Record<string, string>;
  fr: Record<string, string>;
}

const allMessages: i18n = { en, fr, ar };

const userLang: string = navigator.language.slice(0, 2);
// @ts-ignore
const messages: Record<string, string> = allMessages[userLang];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <IntlProvider locale={"fr"} defaultLocale={"en"} messages={ar}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
