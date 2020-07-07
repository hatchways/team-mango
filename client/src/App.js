import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Background from "./pages/Background";

import "./App.css";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" render={() => <Redirect to="/signup" />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignUp} />
          <PrivateRoute path="/background" component={Background} />
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
