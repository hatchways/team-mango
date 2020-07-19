import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { theme } from "./themes/theme";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import { UserContext } from "./contexts/UserContext";

import SignUp from "./pages/SignUp";
import Background from "./pages/Background";
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/faq";
import Navbar from "./pages/navbar";
import Blog from "./pages/Blog";
import CodeUI from "./pages/CodeUI";
import WaitingRoom from "./pages/WaitingRoom";

function App(props) {
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
          console.log(data);
        })
        .catch(function (error) {
          let user = "failed to fetch";
          console.log(error);
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
            <Route path="/login" component={SignUp} />
            <Route path="/background" component={Background} />
            <Route path="/">
              <Navbar />
              <Switch>
                <Route path="/code/:id" component={CodeUI} />
                <Route path="/faq" component={Faq} />
                <Route path="/blog" component={Blog} />
                <Route path="/">
                  <Route path="/dashboard" component={Dashboard} />
                  <Route
                    path="/dashboard/waitingroom/:id"
                    component={WaitingRoom}
                  />
                </Route>
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
