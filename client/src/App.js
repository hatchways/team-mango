import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { theme } from "./themes/theme";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import { UserContext } from "./contexts/UserContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/faq";
import Navbar from "./pages/navbar";
import Blog from "./pages/Blog";
import CodeUI from "./pages/CodeUI";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user: user,
      setUser: setUser,
    }),
    [user, setUser]
  );

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    async function getUser() {
      fetch("/auth/verify")
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          let user = data;
          setUser(user);
        })
        .catch(function (error) {
          let user = "failed to fetch";
          setUser(user);
        });
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signup" />} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/">
              <Navbar />
              <Switch>
                <Route path="/code" component={CodeUI} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/faq" component={Faq} />
                <Route path="/blog" component={Blog} />
              </Switch>
            </Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

/* */
