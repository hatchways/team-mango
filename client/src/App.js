import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import PrivateRoute from "./PrivateRoute";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Background from "./pages/Background";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App(props) {

  return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" render={() => <Redirect to="/signup" />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignUp} />
          <PrivateRoute path="/background" component={Background} />
          <Route path="/dashboard" component={Dashboard} />
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
