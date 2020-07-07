import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = UserContext();
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.token ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
}

export default PrivateRoute;
