import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Background from "./pages/Background";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignUp} />
        <Route path="/background" component={Background} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
