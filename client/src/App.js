import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { UserContext } from "./contexts/UserContext";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Background from "./pages/Background";

import "./App.css";

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
          <Route exact path="/" render={() => <Redirect to="/signup" />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={SignUp} />
          <PrivateRoute path="/background" component={Background} />
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
