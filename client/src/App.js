import React, { useState, useMemo, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Navbar from "./pages/navbar";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Background from "./pages/Background";
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/faq";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import Blog from "./pages/Blog";

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
