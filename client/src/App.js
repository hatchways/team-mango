import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/landing" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
