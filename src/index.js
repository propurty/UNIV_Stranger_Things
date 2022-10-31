import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// MemoryRouter could be good for testing

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Router>
    <App />
  </Router>
);
