import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import SettingsPage from "./SettingsPage.jsx";
import { config } from "dotenv";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme accentColor="indigo">
      <BrowserRouter>
        <Routes>
          <Route path="/connect" element={<App />} />
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/connect/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
